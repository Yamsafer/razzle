import { defaultAction } from '../actions';
import { DEFAULT_ACTION } from '../constants';

describe('Drawer actions', () => {
  it('has a type of DEFAULT_ACTION', () => {
    const expected = {
      type: defaultAction.getType(),
    };
    const result = defaultAction();
    expect(result).to.deep.equal(expected);
  });
});
