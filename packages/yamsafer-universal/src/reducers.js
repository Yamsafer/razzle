import { combineReducers } from 'redux-immutable';
import blockUiReducer, { BLOCK_UI_BRANCH } from './ducks/blockUI';
import sessionReducer, { SESSSION_BRANCH_NAME } from './ducks/session';

export default combineReducers({
  [BLOCK_UI_BRANCH]: blockUiReducer,
  [SESSSION_BRANCH_NAME]: sessionReducer,
});
