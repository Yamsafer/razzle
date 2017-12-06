import { combineReducers } from 'redux-immutable';
import yamsaferUniversalReducers from '../reducers';
import { APP_STATE_BRANCH } from '../constants';

export default function createReducer(asyncReducers) {
  return combineReducers({
    [APP_STATE_BRANCH]: yamsaferUniversalReducers,
    ...asyncReducers,
  });
}
