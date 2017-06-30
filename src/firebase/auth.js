import firebase from './config';

const checkLogin = () => {
  return new Promise(res => {
    res(firebase.auth().authenticated);
  });
};

const currentUser = () => {
  return firebase.auth().currentUser;
};

export {
  checkLogin,
  currentUser,
};