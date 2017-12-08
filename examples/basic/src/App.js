import React from 'react';
import ProptTypes from 'prop-types';
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';

const App = (props, context) => {
  return (
    <div>
      <Appbar />
      <Container>
        <Button color="primary">CLICK ME</Button>
      </Container>
    </div>
  );
};

App.contextTypes = {
  history: ProptTypes.object.isRequired,
};

export default App;
