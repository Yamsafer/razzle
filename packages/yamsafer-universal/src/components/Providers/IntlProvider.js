import React, { Component } from 'react';
import PropType from 'prop-types';
import { IntlProvider } from 'react-intl';

const IntlProviderContainer = ({ locale, translationMessages }) => {
  const localeWithLatnNumbers = locale === 'ar' ? `${locale}-u-nu-latn` : 'en';
  const messages = translationMessages[locale];
  return (
    <IntlProvider locale={localeWithLatnNumbers} messages={messages}>
      {React.Children.only(this.props.children)}
    </IntlProvider>
  );
};

IntlProviderContainer.propTypes = {
  locale: PropType.string.isRequired,
  translationMessages: PropType.object.isRequired,
};

export default IntlProviderContainer;
