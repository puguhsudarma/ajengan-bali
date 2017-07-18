import firebase from './config';
import {
  checkLogin,
  userUid,
  loginWithEmailPassword,
  logout,
  createUser,
} from './auth';

export default firebase;
export {
  checkLogin,
  userUid,
  loginWithEmailPassword,
  logout,
  createUser,
};