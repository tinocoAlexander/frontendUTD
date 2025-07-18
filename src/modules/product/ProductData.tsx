import { useState, useEffect } from 'react';
import { Table, Typography, Input, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Swal from 'sweetalert2';
import ProductEditModal from './ProductEditModal';

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const columns: ColumnsType<any> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (status ? 'Activo' : 'Inactivo'),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <span>
          <a onClick={() => handleEditProduct(record)}>Editar</a>
        </span>
      ),
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/getall`);
        if (!response.ok) throw new Error('Error al obtener productos');
        const data = await response.json();
        setProducts(
          data.products.map((product: any) => ({
            id: product._id,
            name: product.name,
            description: product.description,
            quantity: product.quantity,
            price: product.price,
            status: product.status,
          }))
        );
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los productos. Intenta de nuevo.',
        });
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product: any) =>
    (product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.status ? 'activo' : 'inactivo').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleSave = async (editedProduct: any) => {
    try {
      let response: Response;

      if (!editedProduct.id) {
        // Crear nuevo producto
        response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: editedProduct.name,
            description: editedProduct.description,
            quantity: editedProduct.quantity,
            price: editedProduct.price,
            status: editedProduct.status,
          }),
        });
      } else {
        // Actualizar producto existente
        response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/update/${encodeURIComponent(editedProduct.id)}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: editedProduct.name,
              description: editedProduct.description,
              quantity: editedProduct.quantity,
              price: editedProduct.price,
              status: editedProduct.status,
            }),
          }
        );
      }

      if (!response.ok) throw new Error('Error al guardar el producto');
      const updatedProductData = await response.json();

      if (!editedProduct.id) {
        setProducts([...products, updatedProductData]);
      } else {
        const updatedProducts = products.map(product =>
          product.id === editedProduct.id ? { ...product, ...updatedProductData } : product
        );
        setProducts(updatedProducts);
      }

      setIsModalVisible(false);
      setSelectedProduct(null);

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: !editedProduct.id
          ? 'Producto creado correctamente.'
          : 'Producto actualizado correctamente.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el producto.',
      });
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <Typography.Title level={2}>Lista de Productos</Typography.Title>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddProduct}>
          Agregar Producto
        </Button>
      </div>
      <Input
        placeholder="Buscar productos"
        style={{ marginBottom: 8 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        loading={loading}
      />
      <ProductEditModal
        visible={isModalVisible}
        product={selectedProduct}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </div>
  );
}
