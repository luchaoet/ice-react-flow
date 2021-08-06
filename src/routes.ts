import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Monaco from '@/pages/Monaco';
import Flow from '@/pages/Flow';
import Form from '@/pages/Form';
import DialogTest from '@/pages/DialogTest';
import Test from '@/pages/Test';
import Test2 from '@/pages/Test2';
import Test3 from '@/pages/Test3';

const routerConfig = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
      },
      {
        path: '/test',
        component: Test,
      },
      {
        path: '/test2',
        component: Test2,
      },
      {
        path: '/test3',
        component: Test3,
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
