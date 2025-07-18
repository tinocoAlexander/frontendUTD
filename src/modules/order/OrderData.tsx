import { useState, useEffect } from 'react';
import { Table, Typography, Input, Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Swal from 'sweetalert2';
import OrderEditModal from './OrderEditModal';

export default function OrderList() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Usuario',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => `$${total?.toFixed(2) ?? '0.00'}`,
    },
    {
      title: 'Productos',
      dataIndex: 'products',
      key: 'products',
      render: (products: any[]) =>
        products.map(p => p.productId?.name || p.productId || 'Desconocido').join(', '),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'orange';
        if (status === 'pagado') color = 'green';
        else if (status === 'cancelado') color = 'red';
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <span>
          <a onClick={() => handleEditOrder(record)}>Editar Estado</a>
        </span>
      ),
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/getall`);
        if (!response.ok) throw new Error('Error al obtener órdenes');
        const data = await response.json();
        setOrders(
          data.orders.map((order: any) => ({
            id: order._id,
            userId: order.userId,
            total: order.total,
            products: order.products,
            status: order.status,
          }))
        );
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las órdenes. Intenta de nuevo.',
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order: any) =>
    (order.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.userId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.total || 0).toString().includes(searchTerm) ||
    (order.status || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.products.some((p: any) =>
      (p.productId?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleEditOrder = (order: any) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleSave = async (editedOrder: any) => {
    try {
      setLoading(true);
      let response: Response;

      const body = {
        userId: editedOrder.userId,
        products: editedOrder.products,
        status: editedOrder.status,
      };

      if (!editedOrder.id) {
        response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/update/${editedOrder.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: editedOrder.status }),
        });
      }

      if (!response.ok) throw new Error('Error al guardar la orden');
      const data = await response.json();

      const updatedOrder = {
        id: data._id,
        userId: data.userId,
        total: data.total,
        products: data.products,
        status: data.status,
      };

      if (!editedOrder.id) {
        setOrders(prev => [...prev, updatedOrder]);
      } else {
        setOrders(prev => prev.map(o => o.id === editedOrder.id ? updatedOrder : o));
      }

      Swal.fire({ icon: 'success', title: 'Éxito', text: 'Orden guardada correctamente.' });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar la orden.' });
    } finally {
      setIsModalVisible(false);
      setSelectedOrder(null);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <Typography.Title level={2}>Lista de Órdenes</Typography.Title>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddOrder}>
          Agregar Orden
        </Button>
      </div>
      <Input
        placeholder="Buscar órdenes"
        style={{ marginBottom: 8 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey={(record) => record.id || record._id || Math.random().toString()}
        pagination={{ pageSize: 10 }}
        loading={loading}
      />
      <OrderEditModal
        visible={isModalVisible}
        order={selectedOrder}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </div>
  );
}
