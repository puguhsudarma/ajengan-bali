import { StackNavigator } from 'react-navigation';
// import Splash from '../screens/Splash/Splash';
import Login from '../screens/Login/Login';
// import Pendaftaran from '../screens/Pendaftaran/Pendaftaran';
// import AuthRouter from './AuthRoute';

const AppNavigator = StackNavigator(
  {
    // 'Unauth.Splash': { screen: Splash },
    'Unauth.Login': { screen: Login },
    // 'Unauth.Pendaftaran': { screen: Pendaftaran },
    // 'Unauth.Auth': { screen: AuthRouter },
  },
  {
    // initialRouteName: 'Unauth.Splash',
    navigationOptions: {
      header: null,
    },
    headerMode: 'none',
  },
);

export default AppNavigator;
