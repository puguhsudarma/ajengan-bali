import { StackNavigator } from 'react-navigation';
import {
  Login,
  Pendaftaran,
  Splash,
} from '../pages';
import AUTH_ROUTER from './authRoute';

const SIMALU_APP = StackNavigator(
  {
    splash: {
      screen: Splash,
    },
    login: {
      screen: Login,
    },
    pendaftaran: {
      screen: Pendaftaran,
    },
    Authorized: {
      screen: AUTH_ROUTER,
    },
  },
  {
    initialRouteName: 'splash',
    navigationOptions: {
      header: null,
    },
    headerMode: 'none',
  }
);

export default SIMALU_APP;