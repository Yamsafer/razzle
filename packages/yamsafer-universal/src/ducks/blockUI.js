import { createReducer, createAction } from 'redux-act';
import { combineReducers } from 'redux-immutable';
import { selectApp } from '../selectors';
import { createSelector } from 'reselect';

export const BLOCK_UI_BRANCH = 'BlockUI';

export const selectBlockUi = () =>
  createSelector(selectApp, app => app.get(BLOCK_UI_BRANCH));

export const blockUI = createAction('Block UI');
export const unBlockUI = createAction('Unblock UI');

export default createReducer(
  {
    [blockUI]: (state, payload) => payload || true,
    [unBlockUI]: state => false,
  },
  false
);
