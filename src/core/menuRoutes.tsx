import React from 'react';
import { HomeOutlined, UserOutlined, ShoppingOutlined, ShoppingCartOutlined, BarChartOutlined } from '@ant-design/icons';
import UserForm from '../modules/user/UserForm';
import ProductData from '../modules/product/ProductData';
import OrderData from '../modules/order/OrderData';

export interface AppRoute {
  path: string;
  element: React.ReactElement;
  label?: string;
  icon?: React.ReactNode;
}

const routes: AppRoute[] = [
  {
    path: '/dashboard',
    element: <h1>Hola Mundo</h1>,
    label: 'Inicio',
    icon: <HomeOutlined />,
  },
  {
    path: '/users',
    element: <UserForm />,
    label: 'Usuarios',
    icon: <UserOutlined />,
  },
  {
    path: '/products',
    element: <ProductData />,
    label: 'Productos',
    icon: <ShoppingOutlined />,
  },
  {
    path: '/orders',
    element: <OrderData />,
    label: 'Órdenes',
    icon: <ShoppingCartOutlined />,
  },
  {
    path: '/report',
    element: <UserForm />,
    label: 'Reportes',
    icon: <BarChartOutlined />,
  },
];

export default routes;