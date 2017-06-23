// import React, { Component } from 'react';
import {
  Login,
  Dashboard,
  Pendaftaran,
  Splash,
  DetailWarung,
  DetailMakanan,
  GeoMap,
  Search,
} from './pages';
import { StackNavigator } from 'react-navigation';

const SimaluApp = StackNavigator(
  {
    // splash: {
    //   screen: Splash,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    // login: {
    //   screen: Login,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    // pendaftaran: {
    //   screen: Pendaftaran,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    // dashboard: {
    //   screen: Dashboard,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    // detailWarung: {
    //   screen: DetailWarung,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    // detailMakanan: {
    //   screen: DetailMakanan,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    // geoMap: {
    //   screen: GeoMap,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    search: {
      screen: Search,
      navigationOptions: {
        header: null
      }
    }
  }
);

export default SimaluApp;
