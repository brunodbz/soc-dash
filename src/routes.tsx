import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  protected?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Dashboard',
    path: '/',
    element: <Dashboard />,
    visible: true,
    protected: true
  },
  {
    name: 'Admin Panel',
    path: '/admin',
    element: <AdminPanel />,
    visible: true,
    protected: true
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
    visible: false,
    protected: false
  },
  {
    name: 'Trocar Senha',
    path: '/change-password',
    element: <ChangePassword />,
    visible: false,
    protected: true
  }
];

export default routes;
