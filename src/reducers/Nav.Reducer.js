import createReducer from '../libs/createReducer';
import * as actionType from '../actions/actionType';
import AppNavigator from '../routers';
import { navigatorState, customNavInitState } from './initState';

const navReducer = (state = navigatorState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export const customNavReducer = createReducer(customNavInitState, {
  [actionType.NAVIGATION_NAVIGATE]: (state, action) => {
    switch (action.routeName) {
      case 'DrawerOpen':
        return {
          ...state,
          drawerOpen: true,
        };
      case 'DrawerClose':
        return {
          ...state,
          drawerOpen: false,
        };
      default:
        return state;
    }
  },
});

export default navReducer;
