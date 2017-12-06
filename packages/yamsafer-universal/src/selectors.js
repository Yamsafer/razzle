import { APP_STATE_BRANCH } from './constants';
export const selectApp = state => state.get(APP_STATE_BRANCH);
