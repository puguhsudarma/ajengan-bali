import * as ActionCreator from '../../actions/actionCreator';

const dataDummy = {
  warung: {
    rating: 3.5,
    range: 2.0,
    navigate: 'warung',
    picture: 'https://firebasestorage.googleapis.com/v0/b/ajengan-bali.appspot.com/o/warung%2Fphoto-2.jpg?alt=media&token=a837bde8-1424-4abd-9a81-252f91a6847e',
    daerah: 'Denpasar Selatan',
    nama: 'Warung Babi Guling',
  },
  makanan: {
    rating: 3.5,
    range: 2.0,
    navigate: 'makanan',
    picture: 'https://firebasestorage.googleapis.com/v0/b/ajengan-bali.appspot.com/o/warung%2Fphoto-2.jpg?alt=media&token=a837bde8-1424-4abd-9a81-252f91a6847e',
    daerah: 'Denpasar Selatan',
    nama: 'Babi Guling',
    kategori: 'Babi',
  },
};

export const fetchWarung = () => async (dispatch) => {
  dispatch(ActionCreator.fetchWarung.pending());
  try {
    await setTimeout(() => { }, 10000);
    const containerData = [];
    for (let i = 0; i < 20; i += 1) {
      containerData.push({
        ...dataDummy.warung,
        id: i,
      });
    }
    dispatch(ActionCreator.fetchWarung.success(containerData));
  } catch (err) {
    dispatch(ActionCreator.fetchWarung.failed(err));
  }
};

export const fetchMakanan = () => async (dispatch) => {
  dispatch(ActionCreator.fetchMakanan.pending());
  try {
    await setTimeout(() => { }, 3000);
    const containerData = [];
    for (let i = 0; i < 20; i += 1) {
      containerData.push({
        ...dataDummy.makanan,
        id: i,
      });
    }
    dispatch(ActionCreator.fetchMakanan.success(containerData));
  } catch (err) {
    dispatch(ActionCreator.fetchMakanan.failed(err));
  }
};
