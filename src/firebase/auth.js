import { AsyncStorage } from 'react-native';
import firebase from './config';

/**
 * check user login in firebase authentication and asyncstorage RN
 * 
 * @returns 
 */
const checkLogin = () => {
  const store = AsyncStorage.getItem('@user:loggedIn');
  const auth = firebase.auth().authenticated;
  return Promise.all([store, auth]);
};

/**
 * return current user UID
 * 
 * @returns 
 */
const userUid = () => {
  return firebase.auth().currentUser.uid;
};

/**
 * create user in firebase authentication and
 * store information user to realtime database
 * 
 * @param {any} { nama, username, password, email, alamat, telp } 
 * @returns 
 */
const createUser = ({ nama, username, password, email, alamat, telp }) => {
  const dataUser = { nama, username, password, email, alamat, telp };
  const creating = firebase.auth().createUserWithEmailAndPassword(email, password);
  const database = firebase.database().ref(`users/${creating.uid}`).set(dataUser);
  return Promise.all([creating, database]);
};

/**
 * login with email and password to firebase authentication
 * and store information logged in to asyncstorage RN
 * 
 * @param {any} email 
 * @param {any} pass 
 * @returns 
 */
const loginWithEmailPassword = (email, pass) => {
  const store = AsyncStorage.setItem('@user:loggedIn', 'true');
  const auth = firebase.auth().signInWithEmailAndPassword(email, pass);
  return Promise.all([store, auth]);
};

/**
 * Logout from firebase authentication session
 * and remove item logged in from asyncstorage
 * 
 * @returns 
 */
const logout = () => {
  const store = AsyncStorage.removeItem('@user:loggedIn');
  const auth = firebase.auth().signOut();
  return Promise.all([store, auth]);
};

export {
  checkLogin,
  userUid,
  loginWithEmailPassword,
  logout,
  createUser,
};