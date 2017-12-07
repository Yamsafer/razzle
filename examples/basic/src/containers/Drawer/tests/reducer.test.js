import { fromJS } from 'immutable';
import drawerReducer from '../reducer';
import { defaultAction } from '../actions';

describe('drawerReducer', () => {
  it('Should return the immutable payload', () => {
    const initState = fromJS({ key: 'value' });
    const payload = { key: 'value' };
    const newState = drawerReducer(initState, defaultAction(payload));
    expect(newState).to.deep.equal(fromJS(payload));
  });
});
