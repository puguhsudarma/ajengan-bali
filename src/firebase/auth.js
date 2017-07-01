import firebase from './config';

const checkLogin = () => {
  return new Promise(res => {
    res(firebase.auth().authenticated);
  });
};

const currentUser = () => {
  return firebase.auth().currentUser;
};

const loginWithEmailPassword = (email, pass) => {
  return new Promise((res, rej) => {
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((user) => {
        res(user);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

export {
  checkLogin,
  currentUser,
  loginWithEmailPassword,
  
};