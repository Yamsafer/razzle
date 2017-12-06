import { combineReducers } from 'redux';
import { createAction, createReducer } from 'redux-act';

export const toggle = createAction('Toggle Drawer');

const drawerReducer = createReducer(
  {
    [toggle]: state => !state,
  },
  false
);

export default combineReducers({
  drawer: drawerReducer,
});
