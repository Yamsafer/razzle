import { createReducer } from 'redux-act';
import { toggle } from './actions';

export default createReducer(
  {
    [toggle]: state => !state,
  },
  false
);
