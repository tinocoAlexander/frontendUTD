import { Layout, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import MenuDynamic from './MenuDynamic';

const { Header, Content, Sider } = Layout;

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark">
        <MenuDynamic />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }}></h1>
          <Button type="primary" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Header>
        <Content style={{ margin: '24px 16px 0', padding: 24, background: '#fff', minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;