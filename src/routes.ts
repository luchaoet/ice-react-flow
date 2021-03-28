import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Monaco from '@/pages/Monaco';
import Flow from '@/pages/Flow';
import Form from '@/pages/Form';
import DialogTest from '@/pages/DialogTest';

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
        path: 'dialog',
        component: DialogTest
      },
      {
        path: '/flow',
        component: Flow,
      },
      {
        path: '/',
        component: Monaco,
      },
    ],
  },
];
export default routerConfig;
