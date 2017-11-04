import React from 'react';
import { StackNavigator } from 'react-navigation';
import Drawer from '../components/Drawer/Drawer';
import Dashboard from '../screens/Dashboard/Dashboard';
import DetailWarung from '../screens/DetailWarung/DetailWarung';
import DetailMakanan from '../screens/DetailMakanan/DetailMakanan';
// import GeoMap from '../screens/GeoMap/GeoMap';
import Search from '../screens/Search/Search';
import Profile from '../screens/Profile/Profile';

const AuthRouter = StackNavigator(
  {
    'Auth.Dashboard': { screen: Dashboard },
    'Auth.DetailWarung': { screen: DetailWarung },
    'Auth.DetailMakanan': { screen: DetailMakanan },
    // 'Auth.GeoMap': { screen: GeoMap },
    'Auth.Search': { screen: Search },
    'Auth.Profile': { screen: Profile },
  },
  {
    initialRouteName: 'Auth.Dashboard',
    navigationOptions: {
      header: null,
    },
    headerMode: 'none',
  },
);

export default AuthRouter;
