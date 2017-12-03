import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDistance } from 'geolib';
import { orderBy } from 'lodash';
import Header from '../../components/Header/Header';
import FormInput from './Search.FormInput';
import Result from './Search.Result';
import * as actionType from '../../actions/actionType';
import firebase from '../../config/firebase';
import { toast } from '../../components/Toast/Toast';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearched: false,
      isSearching: false,
      queryText: '',
      msg: '',
      jenisData: 'warung',
      kategoriMakanan: 'pilih',
      listKategoriMakanan: [],
    };

    this._fetchKategoriMakanan = this._fetchKategoriMakanan.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
    this._onSearchSubmit = this._onSearchSubmit.bind(this);
    this._onPressItem = this._onPressItem.bind(this);
    this._showResults = this._showResults.bind(this);
  }

  componentWillMount() {
    this._fetchKategoriMakanan();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.jenisData === nextState.jenisData;
  }

  _fetchKategoriMakanan() {
    const { dispatch } = this.props;
    firebase.database().ref('masterData/jenisMakanan').once('value')
      .then((snapshot) => {
        const data = [{ label: 'Pilih Kategori Makanan', value: 'pilih' }];
        snapshot.forEach((snapChild) => {
          const val = snapChild.val();
          data.push({
            label: val,
            value: val,
          });
        });
        this.setState({
          listKategoriMakanan: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionType.ERROR_MAKANAN,
          payload: err,
        });
        toast(err.message);
      });
  }

  _onChangeText(text) {
    this.setState({ queryText: text });
  }

  _onSearchSubmit() {
    const { queryText, jenisData } = this.state;
    const { dispatch } = this.props;
    const query = {};
    const PATH_REQUEST = 'search/request';
    const PATH_RESPONSE = 'search/response';

    if (queryText === '') {
      return this.setState({ msg: 'form tidak boleh kosong.' });
    }
    this.setState({ msg: '', isSearching: true });

    // setting query
    if (jenisData === 'warung') {
      query.index = 'firebase_warung';
      query.type = 'warung';
      query.q = queryText;
    } else {
      query.index = 'firebase_makanan';
      query.type = 'makanan';
      query.q = queryText;
    }

    // push query to request path
    return firebase.database().ref(PATH_REQUEST).push(query)
      .then((request) => {
        firebase.database().ref(`${PATH_RESPONSE}/${request.key}`).on('value', this._showResults);
      })
      .catch((err) => {
        dispatch({
          type: actionType.ERROR_MAKANAN,
          payload: err,
        });
        toast(err.message);
      })
      .finally(() => {
        this.setState({ isSearching: false, isSearched: true });
      });
  }

  async _showResults(snap) {
    // get data
    const { jenisData } = this.state;
    const { appSetting, dispatch } = this.props;
    try {
      const dataResponse = snap.val().hits.hits;
      // remove listeners once get the data
      snap.ref.off('value', this._showResults);
      // snap.ref.remove();

      // get result query from response path

      // warung
      if (jenisData === 'warung') {
        const payload = dataResponse;
        const data = [];
        payload.forEach((val) => {
          const jarak = getDistance(
            {
              latitude: parseFloat(val._source.lat),
              longitude: parseFloat(val._source.lng),
            },
            {
              latitude: appSetting.position.coords.latitude,
              longitude: appSetting.position.coords.longitude,
            },
          );
          data.push({
            key: val._id,
            km: parseFloat((jarak / 1000).toFixed(2)),
            ...val._source,
          });
        });
        const fixedData = orderBy(data, ['km'], ['asc']);
        dispatch({
          type: actionType.FETCH_SEARCHED_LIST_WARUNG,
          payload: fixedData,
        });
        return;
      }

      // makanan
      const snapJoin = await firebase.database().ref('warung').once('value');
      const payloadJoin = snapJoin.val();
      const payloadSearch = dataResponse;
      const data = [];

      payloadSearch.forEach((snapChild) => {
        const valMakanan = snapChild._source;
        const valWarung = payloadJoin[valMakanan.warungId];

        const jarak = getDistance(
          {
            latitude: parseFloat(valWarung.lat),
            longitude: parseFloat(valWarung.lng),
          },
          {
            latitude: appSetting.position.coords.latitude,
            longitude: appSetting.position.coords.longitude,
          },
        );
        data.push({
          key: snapChild._id,
          km: parseFloat((jarak / 1000).toFixed(2)),
          warung: { ...valWarung },
          daerah: valWarung.daerah,
          ...valMakanan,
        });
      });
      const fixedData = orderBy(data, ['km'], ['asc']);
      dispatch({
        type: actionType.FETCH_SEARCHED_LIST_MAKANAN,
        payload: fixedData,
      });
    } catch (err) {
      if (jenisData === 'warung') {
        dispatch({
          type: actionType.ERROR_WARUNG,
          payload: err,
        });
      } else {
        dispatch({
          type: actionType.ERROR_MAKANAN,
          payload: err,
        });
      }
      toast('Terjadi kegagalan koneksi. Mohon tunggu...');
    }
  }

  _onPressItem(item) {
    const { jenisData } = this.state;
    const { dispatch, navigation } = this.props;
    if (jenisData === 'warung') {
      dispatch({
        type: actionType.SELECT_DATA_WARUNG,
        payload: item,
      });
      return navigation.navigate('Auth.DetailWarung');
    }

    dispatch({
      type: actionType.SELECT_DATA_MAKANAN,
      payload: {
        ...item,
        fromWarungPage: false,
      },
    });
    dispatch({
      type: actionType.SELECT_DATA_WARUNG,
      payload: {
        ...item.warung,
        key: item.warungId,
        km: item.km,
      },
    });
    return navigation.navigate('Auth.DetailMakanan');
  }

  render() {
    const { isSearched, isSearching, listKategoriMakanan, jenisData, msg } = this.state;
    const { goBack } = this.props.navigation;
    const { title, maxRating } = this.props.appSetting;
    const { warung, makanan } = this.props;

    return (
      <Container>
        <Header
          leftItem={{
            icon: 'arrow-back',
            funcPress: () => goBack(),
          }}
          subtitle={title.toUpperCase()}
          title="Search"
        />
        <Content>
          <FormInput
            InputJenisData={{
              data: [
                { label: 'Warung', value: 'warung' },
                { label: 'Makanan', value: 'makanan' },
              ],
              onValueChange: val => this.setState({ jenisData: val }),
            }}
            InputKategoriMakanan={{
              data: listKategoriMakanan,
              onValueChange: val => this.setState({ kategoriMakanan: val }),
            }}
            message={msg}
            jenisData={'warung'}
            loading={isSearching}
            onChangeText={this._onChangeText}
            onSearch={this._onSearchSubmit}
          />
          <Result
            data={jenisData === 'warung' ? warung.listSearched : makanan.listSearched}
            jenisData={jenisData}
            isSearched={isSearched}
            maxRating={maxRating}
            onPress={this._onPressItem}
          />
        </Content>
      </Container>
    );
  }
}

Search.propTypes = {
  navigation: PropTypes.shape().isRequired,
  appSetting: PropTypes.shape().isRequired,
  makanan: PropTypes.shape().isRequired,
  warung: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
  makanan: state.makanan,
  warung: state.warung,
});
export default connect(mapStateToProps)(Search);
