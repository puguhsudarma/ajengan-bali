import firebase from './config';

/**
 * Set data to firebase realtime database.
 * If path already exist, then replace, otherwise make new with key ref
 * 
 * @param {any} ref 
 * @param {any} data 
 * @returns {any} Promise
 */
const set = async (ref, data) => {
  try {
    return await firebase.database().ref(ref).set(data);
  } catch (err) {
    return err;
  }
};

/**
 * read data to firebase realtime database
 * 
 * @param {any} ref 
 * @returns 
 */
const read = async (ref) => {
  try {
    await firebase.database()
      .ref(ref)
      .on('value', (snapshot) => {
        return snapshot.val();
      });
  } catch (err) {
    return err;
  }
};

export {
  set,
  read,
};