import * as ActionCreator from '../../actions/actionCreator';
import firebase from '../../config/firebase';

export const fetchWarung = () => async (dispatch) => {
  dispatch(ActionCreator.fetchWarung.pending());
  try {
    const containerData = [];
    const data = await firebase.database().ref('warung').once('value');
    data.forEach(snap => containerData.push({ id: snap.key, ...snap.val() }));
    dispatch(ActionCreator.fetchWarung.success(containerData));
  } catch (err) {
    dispatch(ActionCreator.fetchWarung.failed(err));
  }
};

export const fetchMakanan = () => ActionCreator.fetchMakanan.pending();
