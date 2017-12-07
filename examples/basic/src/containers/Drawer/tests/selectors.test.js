import { fromJS } from 'immutable';
import { makeSelectDrawerDomain } from '../selectors';

const makeSelectDrawerselector = makeSelectDrawerDomain();

describe('Testing makeSelectDrawerselector', () => {
  it('Should return the state in an mutable form', () => {
    const state = { key: 'value' };
    const result = makeSelectDrawerselector(fromJS(state));
    expect(result).to.equal(state);
  });
});
