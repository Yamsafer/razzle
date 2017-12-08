import React from 'react';
import Home from './components/Home';
import Info from './components/Info';
const routes = [
  {
    path: '',
    action: () => {
      return {
        component: <Home />,
      };
    },
  },
  {
    path: '/info',
    action: () => {
      return {
        component: <Info />,
      };
    },
  },
];

export default routes;
