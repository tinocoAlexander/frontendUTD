import React from 'react';
import { HomeOutlined, UserOutlined, ShoppingOutlined, ShoppingCartOutlined, BarChartOutlined } from '@ant-design/icons';
import UserForm from '../modules/user/UserForm';
import ProductData from '../modules/product/ProductData';
import OrderData from '../modules/order/OrderData';

export interface AppRoute {
  path: string;
  element: React.ReactElement;
  title?: string;
  icon?: React.ReactNode;
  roles?: string[];
}

const routes: AppRoute[] = [
  {
    path: '/dashboard',
    element: <div className="content-container"><h1></h1></div>,
    title: 'Inicio',
    icon: <HomeOutlined />,
    roles: ['admin', 'user'],
  },
  {
    path: '/users',
    element: <UserForm />,
    title: 'Usuarios',
    icon: <UserOutlined />,
    roles: ['admin'],
  },
  {
    path: '/products',
    element: <ProductData />,
    title: 'Productos',
    icon: <ShoppingOutlined />,
    roles: ['admin', 'user'],
  },
  {
    path: '/orders',
    element: <OrderData />,
    title: 'Órdenes',
    icon: <ShoppingCartOutlined />,
    roles: ['admin', 'user'],
  },
];

export default routes;