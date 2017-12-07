import React from 'react';
import { shallow } from 'enzyme';

import { Drawer } from '../index';

const mockStyler = {
  styles: {},
  processStyle() {},
  computeStyle() {},
};

describe('<Drawer />', () => {
  it('Should render div element', () => {
    const wrapper = shallow(<Drawer {...mockStyler} />);
    expect(wrapper.find('div')).to.have.length(1);
  });
});
