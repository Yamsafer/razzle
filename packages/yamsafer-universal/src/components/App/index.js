import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { InlineStylerProvider, ContextProvider } from '../Providers';

const propTypes = {
  locale: PropTypes.bool.isRequired,
  store: PropTypes.object.isRequired,
  isUiBlocked: PropTypes.bool.isRequired,
  translationMessages: PropTypes.object.isRequired,
  UserPrpviders: PropTypes.element,
};
//
// const defaultProps = {
//   UserProviders: props => props.children,
// }

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  //
  // componentDidCatch(e) {
  //   this.setState({ hasErrpr: e })
  // }
  //
  // renderBlockUi = () => {
  //   this.target = this.target || document.querySelector(`#${BLOCK_UI_DIV_ID}`);
  //   return ReactDOM.createPortal(
  //     <BlockableUi withPortal withFullscreenPortal blocked  portalBackgroundColor={'white'} />,
  //     this.target,
  //   );
  // }

  render() {
    const { isUiBlocked, locale, store, context, UserProviders } = this.props;
    const isRTL = locale === 'ar';
    return (
      <ReduxProvider store={store}>
        <InlineStylerProvider isRTL={isRTL}>
          <ContextProvider context={context}>
            {React.Children.only(this.props.children)}
          </ContextProvider>
        </InlineStylerProvider>
      </ReduxProvider>
    );
  }
}

App.propTypes = propTypes;
// App.defaultProps = defaultProps;

export default App;
