import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GetDirections from 'react-native-google-maps-directions';
import { Alert } from '../../components/Alert/Alert';
import Header from '../../components/Header/Header';
import ActionButton from '../../components/ActionButton/ActionButton';
import Modal from '../../components/Modal/Modal';
import CardDetail from './DetailMakanan.CardDetail';
import CardDetailWarung from './DetailMakanan.CardDetailWarung';
import CardReview from './DetailMakanan.CardReview';

class DetailMakanan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      star: 0,
      review: '',
      visible: false,
    };
    this._onModalShow = this._onModalShow.bind(this);
    this._onModalOk = this._onModalOk.bind(this);
    this._onModalCancel = this._onModalCancel.bind(this);
    this._handleGetDirections = this._handleGetDirections.bind(this);
  }

  _handleGetDirections() {
    const { latitude: myLat, longitude: myLong } = this.props.appSetting;
    const { latitude, longitude } = this.props.warung;
    if (myLat === null && myLong === null) return Alert('Koordinat lokasi pengguna tidak ditemukan');
    return GetDirections({
      source: {
        latitude: myLat,
        longitude: myLong,
      },
      destination: {
        latitude,
        longitude,
      },
    });
  }

  _onModalShow() {
    this.setState({
      visible: true,
    });
  }

  _onModalOk(input) {
    this.setState({
      star: input.star,
      review: input.review,
    });
  }

  _onModalCancel() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { star, review, visible } = this.state;
    const { nama, deskripsi, gambar, rating, harga, kategori, reviews } = this.props.makanan;
    const { nama: namaWarung, alamat, daerah, range, fromWarungPage } = this.props.warung;
    const { goBack, navigate } = this.props.navigation;
    const { title, maxRating } = this.props.appSetting;

    return (
      <Container>
        <Header
          leftItem={{
            icon: 'arrow-back',
            funcPress: () => goBack(),
          }}
          rightItem={[
            {
              id: 1,
              icon: 'refresh',
              funcPress: () => { },
            },
          ]}
          subtitle={title.toUpperCase()}
          title="Detail Warung"
        />

        <Content>
          <CardDetail
            nama={nama}
            deskripsi={deskripsi}
            gambar={gambar}
            harga={harga}
            kategori={kategori}
            rating={rating}
            maxRating={maxRating}
          />

          <CardDetailWarung
            alamat={alamat}
            daerah={daerah}
            displayButton={fromWarungPage}
            nama={namaWarung}
            navigate={() => navigate('warung')}
            range={range}
          />

          <CardReview
            data={reviews}
            maxRating={maxRating}
          />
        </Content>

        <ActionButton
          actions={[
            {
              key: 1,
              color: '#9b59b6',
              title: 'Navigasi Peta',
              onPress: this._handleGetDirections(),
              icon: 'map',
            },
            {
              key: 2,
              color: '#3498db',
              title: 'Beri Review',
              onPress: this._onModalShow(),
              icon: 'star',
            },
          ]}
        />

        <Modal
          visible={visible}
          input={{ star, review }}
          maxRating={maxRating}
          onModalCancel={this._onModalCancel}
          onModalOk={this._onModalOk}
        />
      </Container>
    );
  }
}

DetailMakanan.propTypes = {
  appSetting: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
  warung: PropTypes.shape().isRequired,
  makanan: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
  warung: state.warung.selectedData,
  makanan: state.makanan.selectedData,
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(DetailMakanan);
