import {
  Login,
  Pendaftaran,
  Splash,
} from '../pages';
import { StackNavigator } from 'react-navigation';

const UNAUTH_ROUTER = StackNavigator(
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
  },
  {
    initialRouteName: 'splash',
    navigationOptions: {
      header: null,
    }
  }
);

export default UNAUTH_ROUTER;