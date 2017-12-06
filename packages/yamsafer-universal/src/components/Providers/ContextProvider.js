import React from 'react';
import PropTypes from 'prop-types';

const ContextType = {
  history: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  isRTL: PropTypes.bool.isRequired,
  configs: PropTypes.object.isRequired,
  device: PropTypes.string.isRequired,
  userAgent: PropTypes.string.isRequired,
  parsedUserAgent: PropTypes.object,
};

const propTypes = {
  context: PropTypes.shape(ContextType).isRequired,
  children: PropTypes.element.isRequired,
};

class ContextProvider extends React.Component {
  getChildContext() {
    return this.props.context;
  }
  render() {
    return this.props.children;
  }
}

ContextProvider.propTypes = propTypes;
ContextProvider.childContextTypes = ContextType;

export default ContextProvider;
