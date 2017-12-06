import React from 'react';
import App from './App';
const routes = [
  {
    path: '',
    action: () => {
      return {
        component: <App />,
      };
    },
  },
];

export default routes;
