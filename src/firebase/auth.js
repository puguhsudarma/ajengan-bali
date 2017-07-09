import { AsyncStorage } from 'react-native';
import firebase from './config';
import { set } from './database';

/**
 * check user login in firebase authentication and asyncstorage RN
 * 
 * @returns 
 */
const checkLogin = async () => {
  try {
    return await AsyncStorage.getItem('@user:loggedIn') && await firebase.auth().authenticated;
  } catch (err) {
    throw err;
  }
};

/**
 * return information about current user login
 * 
 * @returns 
 */
const currentUser = async () => {
  try {
    return await firebase.auth().currentUser;
  } catch (err) {
    throw err;
  }
};

/**
 * return current user UID
 * 
 * @returns 
 */
const userUid = async () => {
  try {
    return await firebase.auth().currentUser.uid;
  } catch (err) {
    throw err;
  }
};

/**
 * create user in firebase authentication and
 * store information user to realtime database
 * 
 * @param {any} { nama, username, password, email, alamat, telp } 
 * @returns 
 */
const createUser = async ({ nama, username, password, email, alamat, telp }) => {
  try {
    const dataUser = { nama, username, password, email, alamat, telp };
    const creating = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if (!creating) {
      throw 'Ada kendala koneksi ke server';
    }
    return await set(`users/${creating.uid}`, dataUser);
  } catch (err) {
    throw err;
  }
};

/**
 * login with email and password to firebase authentication
 * and store information logged in to asyncstorage RN
 * 
 * @param {any} email 
 * @param {any} pass 
 * @returns 
 */
const loginWithEmailPassword = async (email, pass) => {
  try {
    await AsyncStorage.setItem('@user:loggedIn', 'true');
    return await firebase.auth().signInWithEmailAndPassword(email, pass);
  } catch (err) {
    throw err;
  }
};

/**
 * Logout from firebase authentication session
 * and remove item logged in from asyncstorage
 * 
 * @returns 
 */
const logout = async () => {
  try {
    return await firebase.auth().signOut() && await AsyncStorage.removeItem('@user:loggedIn');
  } catch (err) {
    throw err;
  }
};

export {
  checkLogin,
  currentUser,
  userUid,
  loginWithEmailPassword,
  logout,
  createUser,
};