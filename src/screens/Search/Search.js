import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const { queryText } = this.state;
    if (queryText === '') {
      return this.setState({ msg: 'form tidak boleh kosong.' });
    }

    this.setState({ msg: '', isSearching: true });
    setTimeout(() => {
      this.setState({ isSearching: false });
    }, 5000);
    return console.log(this.state);
  }

  _onPressItem(item) {
    const { dispatch, navigation } = this.props;
  }

  render() {
    const { isSearched, isSearching, listKategoriMakanan, jenisData, msg } = this.state;
    const { navigate } = this.props.navigation;
    const { title, maxRating } = this.props.appSetting;
    const { warung, makanan } = this.props;

    return (
      <Container>
        <Header
          leftItem={{
            icon: 'menu',
            funcPress: () => navigate('DrawerOpen'),
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
