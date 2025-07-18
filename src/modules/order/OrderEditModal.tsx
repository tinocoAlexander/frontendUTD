import { Modal, Select, Button, Typography, Space, Input } from 'antd';
import { useState, useEffect } from 'react';

const { Text } = Typography;

interface OrderEditModalProps {
  visible: boolean;
  order: any;
  onCancel: () => void;
  onSave: (order: any) => void;
}

export default function OrderEditModal({ visible, order, onCancel, onSave }: OrderEditModalProps) {
  const [editedOrder, setEditedOrder] = useState<any>({
    id: '',
    userId: '',
    products: [],
    status: 'pendiente',
  });
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);

  useEffect(() => {
    if (order) {
      setEditedOrder({
        id: order.id,
        userId: order.userId || '',
        products: order.products || [],
        status: order.status || 'pendiente',
      });
    } else {
      setEditedOrder({
        id: '',
        userId: '',
        products: [],
        status: 'pendiente',
      });
    }
  }, [order]);

  useEffect(() => {
    if (visible) {
      fetch(`${import.meta.env.VITE_API_URL}/api/products/getall`)
        .then(res => res.json())
        .then(data => setAvailableProducts(data.products))
        .catch(err => console.error(err));
    }
  }, [visible]);

  const handleChange = (field: string, value: any) => {
    setEditedOrder({ ...editedOrder, [field]: value });
  };

  const handleProductsChange = (values: string[]) => {
    const selected = values.map((id) => ({
      productId: id,
      quantity: 1,
    }));
    setEditedOrder({ ...editedOrder, products: selected });
  };

  const handleSaveClick = () => {
    if (!editedOrder.userId || editedOrder.products.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Datos incompletos',
        text: 'Debes indicar un usuario y al menos un producto.',
      });
      return;
    }
    onSave(editedOrder);
  };

  return (
    <Modal
      title={order ? 'Editar Orden' : 'Agregar Orden'}
      open={visible}
      onCancel={onCancel}
      centered
      width={400}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" onClick={handleSaveClick}>
          Guardar
        </Button>,
      ]}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <Text strong>ID Usuario:</Text>
          <Input
            value={editedOrder.userId}
            onChange={(e) => handleChange('userId', e.target.value)}
            placeholder="ID del usuario"
          />
        </div>
        <div>
          <Text strong>Productos:</Text>
          <Select
            mode="multiple"
            placeholder="Selecciona productos"
            style={{ width: '100%' }}
            value={editedOrder.products.map((p: any) => p.productId)}
            onChange={handleProductsChange}
          >
            {availableProducts.map((product) => (
              <Select.Option key={product._id} value={product._id}>
                {product.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Space>
    </Modal>
  );
}
