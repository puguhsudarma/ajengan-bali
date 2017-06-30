import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { Drawer } from '../components';
import {
  Dashboard,
  DetailWarung,
  DetailMakanan,
  GeoMap,
  Search,
  Profile,
} from '../pages';

const AUTH_ROUTER = DrawerNavigator(
  {
    dashboard: {
      screen: Dashboard,
    },
    detailWarung: {
      screen: DetailWarung,
    },
    detailMakanan: {
      screen: DetailMakanan,
    },
    geoMap: {
      screen: GeoMap,
    },
    search: {
      screen: Search,
    },
    profile: {
      screen: Profile,
    },    
  },
  {
    initialRouteName: 'dashboard',
    navigationOptions: {
      header: null,
    },
    contentComponent: props => <Drawer property={props} />
  }
);

export default AUTH_ROUTER;