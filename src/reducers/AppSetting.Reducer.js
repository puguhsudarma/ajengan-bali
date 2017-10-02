import createReducer from '../libs/createReducer';
import * as actionType from '../actions/actionType';
import { appSetting } from './initState';

const appSettingReducer = createReducer(appSetting, {
  [actionType.FETCH_DATA_COORDINATE_LOCATION]: (state, action) => ({
    ...state,
    position: action.payload,
  }),
  [actionType.FETCH_DATA_THIS_USER]: (state, action) => ({
    ...state,
    userLogin: {
      ...state.userLogin,
      isLogin: true,
      uid: action.payload.uid,
      displayName: action.payload.displayName,
      email: action.payload.email,
    },
  }),
  [actionType.LOGIN_THIS_USER]: (state, action) => ({
    ...state,
    userLogin: {
      ...state.userLogin,
      isLogin: true,
      uid: action.payload.uid,
      displayName: action.payload.displayName,
      email: action.payload.email,
    },
  }),
  [actionType.DAFTAR_THIS_USER]: (state, action) => ({
    ...state,
    userLogin: {
      ...state.userLogin,
      isLogin: true,
      uid: action.payload.uid,
      displayName: action.payload.displayName,
      email: action.payload.email,
    },
  }),
  [actionType.ERROR_APP_SETTING]: (state, action) => ({
    ...state,
    error: [
      ...state.error,
      action.payload,
    ],
  }),
});

export default appSettingReducer;
