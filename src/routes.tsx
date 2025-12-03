import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Dashboard',
    path: '/',
    element: <Dashboard />,
    visible: true
  },
  {
    name: 'Admin Panel',
    path: '/admin',
    element: <AdminPanel />,
    visible: true
  }
];

export default routes;
