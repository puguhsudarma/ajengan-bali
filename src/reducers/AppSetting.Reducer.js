import createReducer from '../libs/createReducer';
import * as actionType from '../actions/actionType';
import { appSetting } from './initState';

const appSettingReducer = createReducer(appSetting, {
  [actionType.FETCH_LOCATION_FULLFILED]: (state, action) => ({
    ...state,
    position: action.payload,
  }),
  [actionType.FETCH_USER_FULLFILED]: (state, action) => ({
    ...state,
    userLogin: {
      ...state.userLogin,
      isLogin: true,
      uid: action.payload.uid,
      displayName: action.payload.displayName,
      email: action.payload.email,
    },
  }),
});

export default appSettingReducer;
