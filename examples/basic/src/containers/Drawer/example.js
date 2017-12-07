import React from 'react';
import Drawer from './index';

export default class DrawerWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Drawer {...this.props} />
      </div>
    );
  }
}
