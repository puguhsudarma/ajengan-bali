import { NavigationActions } from 'react-navigation';
import AppNavigator from '../routers';
import logo from '../images/logo.png';
import avatar from '../images/avatar5.png';

export const navigatorState = AppNavigator.router.getStateForAction(NavigationActions.init());
export const customNavInitState = {
  drawerOpen: false,
};

export const warungInitState = {
  list: [],
  listSearched: [],
  selected: {},
  reviews: [],
  thisUserReview: {},
  error: [],
};

export const makananInitState = {
  list: [],
  listSearched: [],
  listMakananBySelectedWarung: [],
  selected: {},
  reviews: [],
  thisUserReview: {},
  error: [],
};

export const appSetting = {
  title: 'Ajegli',
  subtitle: 'Powered By React Native',
  ver: '0.4-alpha',
  logo,
  maxRating: 5,
  position: {},
  userLogin: {
    avatar,
    isLogin: false,
  },
  error: [],
};
