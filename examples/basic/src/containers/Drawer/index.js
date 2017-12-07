import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectStyles from 'react-inline-styler';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import DrawerComponent from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import makeSelectDrawer from './selectors';
import messages from './messages';
import styles from './styles';
import { toggle } from './actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class Drawer extends Component {
  render() {
    const { isOpen, dispatch } = this.props;
    return [
      <AppBar
        title="Yamsafer Universal with Material UI"
        iconElementLeft={
          <IconButton onClick={dispatch(toggle())}>
            <NavigationMenu />
          </IconButton>
        }
      />,
      <DrawerComponent open={isOpen}>Hello World</DrawerComponent>,
    ];
  }
}

Drawer.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectDrawer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectStyles(styles)(Drawer)
);
