import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Flow from '@/pages/Flow';
import Form from '@/pages/Form';

const routerConfig = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/test',
        component: Dashboard,
      },
      {
        path: 'form',
        component: Form
      },
      {
        path: '/',
        component: Flow,
      },
    ],
  },
];
export default routerConfig;
