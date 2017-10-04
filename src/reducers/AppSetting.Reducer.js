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
      ...action.payload,
      isLogin: true,
    },
  }),
  [actionType.LOGIN_THIS_USER]: (state, action) => ({
    ...state,
    userLogin: {
      ...state.userLogin,
      ...action.payload,
      isLogin: true,
    },
  }),
  [actionType.DAFTAR_THIS_USER]: (state, action) => ({
    ...state,
    userLogin: {
      ...state.userLogin,
      ...action.payload,
      isLogin: true,
    },
  }),
  [actionType.LOGOUT_THIS_USER]: state => ({
    ...state,
    userLogin: {
      avatar: state.userLogin.avatar,
      alamat: '',
      displayName: '',
      email: '',
      level: 1,
      nama: '',
      softDelete: false,
      telp: '',
      uid: '',
      username: '',
      isLogin: false,
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
