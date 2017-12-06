import immutable from 'immutable';
import { createStructuredSelector, createSelector } from 'reselect';
import { createAction, createReducer } from 'redux-act';
import { selectApp } from '../selectors';

// Constatns
export const SESSSION_BRANCH_NAME = 'Session';

// Actions
export const createSession = createAction('Create Session');
export const updateSession = createAction('Update Session');

// Selectors
export const selectSession = () =>
  createSelector(selectApp, app => app.get(SESSSION_BRANCH_NAME));
export const selectFromSession = prop =>
  createSelector(selectSession(), session => session.get(prop));

export const structuredSelector = createStructuredSelector({
  session: selectSession(),
});

const initialState = new immutable.Map();

export default createReducer(
  {
    [createSession]: (state, payload) => immutable.fromJS(payload),
    [updateSession]: (state, payload) => state.merge(immutable.fromJS(payload)),
  },
  initialState
);
