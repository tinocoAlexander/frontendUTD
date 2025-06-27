import 'antd/dist/reset.css';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './modules/dashboard/Dashboard';
import routes from './core/menuRoutes';
import AuthRoutes from './auth/AuthRoutes';
import Login from './auth/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <AuthRoutes>
            <Dashboard />
          </AuthRoutes>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>
      <Route path="*" element={<div>404 - No encontrado</div>} />
    </Routes>
  );
}

export default App;