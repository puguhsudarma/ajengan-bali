import { NavigationActions } from 'react-navigation';
import AppNavigator from '../routers';
import logo from '../images/logo.png';

export const navigatorState = AppNavigator.router.getStateForAction(NavigationActions.init());

export const warungInitState = {
  listData: [],
  selectedData: {},
  isFetching: false,
  isFetched: false,
  error: null,
  markers: [],
};

export const makananInitState = {
  listData: [],
  listSelectedData: [],
  selectedData: {},
  isFetching: false,
  isFetched: false,
  error: null,
};

export const appSetting = {
  title: 'Ajegli',
  subtitle: 'Powered By React Native',
  ver: '0.1-alpha',
  logo,
  maxRating: 5,
  latitude: null,
  longitude: null,
  userLogin: {
    email: null,
    gambar: null,
    nama: null,
    alamat: null,
    telepon: null,
    username: null,
    loading: false,
  },
};
