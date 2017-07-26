import AppNavigator from '../routers';
import { navigatorState } from './initState';

const navReducer = (state = navigatorState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export default navReducer;
