import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import routes from '../../core/menuRoutes';

interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
}

const MenuDynamic: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const items = routes
      .filter((item) => item.label)
      .map((item) => ({
        key: item.path,
        icon: item.icon,
        label: item.label || '',
      }));
    setMenuItems(items);
  }, []);

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => navigate(key)}
      items={menuItems}
      style={{ height: '100%', borderRight: 0 }}
    />
  );
};

export default MenuDynamic;