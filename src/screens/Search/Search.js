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
  }

  componentWillMount() {
    this._fetchKategoriMakanan();
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
    const { dispatch, appSetting } = this.props;
    if (queryText === '') {
      return this.setState({ msg: 'form tidak boleh kosong.' });
    }
    this.setState({ msg: '', isSearching: true });

    // pencarian warung
    if (jenisData === 'warung') {
      return firebase.database()
        .ref('warung')
        .orderByChild('softDelete')
        .equalTo(false)
        .once('value')
        .then((snapShot) => {
          const data = [];
          snapShot.forEach((snapChild) => {
            const val = snapChild.val();
            const jarak = getDistance(
              {
                latitude: parseFloat(val.lat),
                longitude: parseFloat(val.lng),
              },
              {
                latitude: appSetting.position.coords.latitude,
                longitude: appSetting.position.coords.longitude,
              },
            );
            data.push({
              key: snapChild.key,
              km: parseFloat((jarak / 1000).toFixed(2)),
              ...val,
            });
          });
          const fixedData = orderBy(data, ['km'], ['asc']);
          dispatch({
            type: actionType.FETCH_SEARCHED_LIST_WARUNG,
            payload: fixedData,
          });
          this.setState({ isSearching: false, isSearched: true });
        })
        .catch((err) => {
          dispatch({
            type: actionType.ERROR_WARUNG,
            payload: err,
          });
          toast(err.message);
        })
        .finally(() => {
          this.setState({ isSearching: false, isSearched: true });
        });
    }

    // pencarian makanan
    return firebase.database()
      .ref('makanan')
      .orderByChild('softDelete')
      .equalTo(false)
      .once('value')
      .then((snapShot) => {
        const promises = [];
        const data = [];
        snapShot.forEach((snapChild) => {
          promises.push(
            firebase.database()
              .ref(`warung/${snapChild.val().warungId}`)
              .once('value'),
          );
        });

        Promise.all(promises)
          .then((snapJoin) => {
            let index = 0;
            snapShot.forEach((snapChild) => {
              const valMakanan = snapChild.val();
              const valWarung = snapJoin[index].val();
              index += 1;

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
                key: snapChild.key,
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
          });
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
            jenisData={jenisData}
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
