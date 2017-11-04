import { StackNavigator } from 'react-navigation';
import Splash from '../screens/Splash/Splash';
import Login from '../screens/Login/Login';
import Pendaftaran from '../screens/Pendaftaran/Pendaftaran';

import Dashboard from '../screens/Dashboard/Dashboard';
import DetailWarung from '../screens/DetailWarung/DetailWarung';
import DetailMakanan from '../screens/DetailMakanan/DetailMakanan';
// import GeoMap from '../screens/GeoMap/GeoMap';
import Search from '../screens/Search/Search';
import Profile from '../screens/Profile/Profile';

const AppNavigator = StackNavigator(
  {
    'Unauth.Splash': { screen: Splash },
    'Unauth.Login': { screen: Login },
    'Unauth.Pendaftaran': { screen: Pendaftaran },

    'Auth.Dashboard': { screen: Dashboard },
    'Auth.DetailWarung': { screen: DetailWarung },
    'Auth.DetailMakanan': { screen: DetailMakanan },
    // 'Auth.GeoMap': { screen: GeoMap },
    'Auth.Search': { screen: Search },
    'Auth.Profile': { screen: Profile },
  },
  {
    initialRouteName: 'Unauth.Splash',
    navigationOptions: {
      header: null,
    },
    headerMode: 'none',
  },
);

export default AppNavigator;
