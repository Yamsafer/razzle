import { createSelector } from 'reselect';
import { BRANCH_NAME } from './constants';

/**
 * Direct selector to the drawer state domain
 */
const selectDrawerDomain = () => state => {
  console.log({ state });
  return state.get(BRANCH_NAME);
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Drawer
 */

const makeSelectDrawer = () =>
  createSelector(selectDrawerDomain(), substate => {
    console.log('substate', substate);
    return substate;
  });

export default makeSelectDrawer;
export { selectDrawerDomain };
