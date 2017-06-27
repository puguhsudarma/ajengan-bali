import { StackNavigator } from 'react-navigation';
import AUTH_ROUTER from './authRoute';
import UNAUTH_ROUTER from './unAuthRoute';

const SIMALU_APP = StackNavigator(
  {
    UnAuthorized: {
      screen: UNAUTH_ROUTER,
    },
    Authorized: {
      screen: AUTH_ROUTER,
    },
  },
  {
    initialRouteName: 'UnAuthorized',
    headerMode: 'none',
  }
);

export default SIMALU_APP;