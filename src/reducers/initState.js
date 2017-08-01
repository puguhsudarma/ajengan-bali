import { NavigationActions } from 'react-navigation';
import AppNavigator from '../routers';
import logo from '../images/logo.png';

export const navigatorState = AppNavigator.router.getStateForAction(NavigationActions.init());

export const warungInitState = {
  listData: [],
  selectedDarung: {},
  isFetching: false,
  isFetched: false,
  error: null,
};

export const makananInitState = {
  listData: [],
  selectedData: {},
  isFetching: false,
  isFetched: false,
  error: null,
};

export const appInfo = {
  title: 'Ajegli',
  subtitle: 'Powered By React Native',
  ver: '0.1-alpha',
  logo,
};
