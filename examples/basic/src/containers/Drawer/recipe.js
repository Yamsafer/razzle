import React from 'react';
import { host } from 'storybook-host';
import withReadme from 'storybook-readme/with-readme';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DrawerExample from './example';
import readme from './readme.md';
import sagas from './sagas';
import WithLocaleStoryWrapper from 'dev/WithLocaleStoryWrapper';
const stories = storiesOf('Drawer', module);

stories
  .addDecorator(withReadme(readme))
  .addDecorator(
    host({
      title: 'Drawer Example',
      align: 'center middle',
      height: '80%',
      width: '80%',
      padding: '10px',
      sagas: sagas,
    })
  )
  .add('Default', () => {
    return (
      <WithLocaleStoryWrapper>
        <DrawerExample />
      </WithLocaleStoryWrapper>
    );
  });
