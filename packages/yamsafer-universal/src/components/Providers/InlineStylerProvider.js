import React from 'react';
import PropType from 'prop-types';
import { InlineStylerProvider } from 'react-inline-styler';
import rtlProcessor, {
  inlineStylerRTLProccessorHelpers,
} from 'react-inline-styler-processor-rtl';

const pipeline = [rtlProcessor];

const Provider = ({ isRTL, children }) => {
  const configs = {
    isRTL: isRTL,
    stylerHelpers: inlineStylerRTLProccessorHelpers(isRTL),
  };
  return (
    <InlineStylerProvider pipeline={pipeline} configs={configs}>
      {React.Children.only(children)}
    </InlineStylerProvider>
  );
};

Provider.propType = {
  isRTL: PropType.bool.isRequired,
};

export default Provider;
