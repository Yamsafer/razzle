import React from 'react';

function Providers({ children, context }) {
  return React.Children.only(children);
}

export default Providers;
