import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Item, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getDirections from 'react-native-google-maps-directions';
import _ from 'lodash';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import * as actionType from '../../actions/actionType';
import firebase from '../../config/firebase';
import TitleCard from '../../components/TitleCard/TitleCard';
import { toast } from '../../components/Toast/Toast';
import Header from '../../components/Header/Header';
import FAB from '../../components/FAB/FAB';
import CardDetail from './DetailWarung.CardDetail';
import CardMakanan from './DetailWarung.CardMakanan';
import CardReview from './DetailWarung.CardReview';
import styles from './DetailWarung.Style';

class DetailWarung extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      review: '',
      visible: false,
    };

    this.__listenFetchMakanan = null;
    this.__listenFetchReview = null;

    this._fetchMakanan = this._fetchMakanan.bind(this);
    this.___handleSuccessFetchMakanan = this.___handleSuccessFetchMakanan.bind(this);
    this.___handleErrorFetchMakanan = this.___handleErrorFetchMakanan.bind(this);

    this._fetchListReview = this._fetchListReview.bind(this);
    this.___handleSuccessListReview = this.___handleSuccessListReview.bind(this);
    this.___handleErrorListReview = this.___handleErrorListReview.bind(this);

    this._onModalShow = this._onModalShow.bind(this);
    this._onModalOk = this._onModalOk.bind(this);
    this._onModalCancel = this._onModalCancel.bind(this);

    this._handleGetDirections = this._handleGetDirections.bind(this);
    this._handleClickMakanan = this._handleClickMakanan.bind(this);
  }

  componentWillMount() {
    Promise.all([
      this._fetchMakanan(),
      this._fetchListReview(),
    ]);
  }

  componentWillUnmount() {
    if (this.__listenFetchMakanan) {
      this.__listenFetchMakanan
        .off('value', this.___handleSuccessFetchMakanan, this.___handleErrorFetchMakanan);
    }

    if (this.__listenFetchReview) {
      this.__listenFetchReview
        .off('value', this.___handleSuccessListReview, this.___handleErrorListReview);
    }
  }

  // Fetch List Makanan
  _fetchMakanan() {
    const { warung } = this.props;
    this.__listenFetchMakanan = firebase.database().ref('makanan')
      .orderByChild('indexWarungSoftDelete')
      .equalTo(`${false}_${warung.selected.key}`);
    this.__listenFetchMakanan.on('value', this.___handleSuccessFetchMakanan, this.___handleErrorFetchMakanan);
  }

  ___handleSuccessFetchMakanan(snapshot) {
    const { dispatch } = this.props;
    const data = [];
    snapshot.forEach((snapChild) => {
      data.push({ ...snapChild.val(), key: snapChild.key });
    });
    dispatch({
      type: actionType.FETCH_DATA_LIST_MAKANAN_BY_SELECTED_WARUNG,
      payload: data,
    });
  }

  ___handleErrorFetchMakanan(err) {
    this.props.dispatch({
      type: actionType.ERROR_MAKANAN,
      payload: err,
    });
    toast(err.message);
  }

  // Fetch List Review
  _fetchListReview() {
    const { warung } = this.props;
    this.__listenFetchReview = firebase.database().ref(`rating/warung/${warung.selected.key}`)
      .orderByChild('rating')
      .startAt(0);
    this.__listenFetchReview.on('value', this.___handleSuccessListReview, this.___handleErrorListReview);
  }

  ___handleSuccessListReview(snapshot) {
    const { dispatch, appSetting } = this.props;
    const data = [];
    const promise = [];
    let isThisUserReview = false;
    let thisUserReview = {};

    snapshot.forEach((snapChild) => {
      if (appSetting.userLogin.uid === snapChild.key) isThisUserReview = true;
      promise.push(
        firebase.database()
          .ref(`users/${snapChild.key}`)
          .once('value')
          .then(snapJoin => snapJoin.val()),
      );
    });

    // lets fetch this user review
    if (!isThisUserReview) {
      promise.push(
        firebase.database()
          .ref(`users/${appSetting.userLogin.uid}`)
          .once('value')
          .then(snapJoin => snapJoin.val()),
      );
    }

    Promise.all(promise).then((dataResp) => {
      let index = 0;
      snapshot.forEach((snapChild) => {
        if (appSetting.userLogin.uid === snapChild.key) thisUserReview = { ...snapChild.val() };
        data.push({ ...snapChild.val(), key: snapChild.key, nama: dataResp[index].nama });
        index += 1;
      });

      dispatch({
        type: actionType.FETCH_DATA_LIST_REVIEW_WARUNG,
        payload: {
          reviews: data,
          thisUserReview: {
            rating: thisUserReview.rating,
            review: thisUserReview.review,
          },
        },
      });
    });
  }

  ___handleErrorListReview(err) {
    this.props.dispatch({
      type: actionType.ERROR_WARUNG,
      payload: err,
    });
    toast(err.message);
  }

  // Handle Modal
  _onModalShow() {
    const { rating, review } = this.props.warung.thisUserReview;
    this.setState({
      visible: true,
      rating,
      review,
    });
  }

  _onModalOk() {
    const { rating, review } = this.state;
    const { dispatch, warung, appSetting } = this.props;

    firebase.database()
      .ref(`rating/warung/${warung.selected.key}/${appSetting.userLogin.uid}`)
      .update({ rating, review })
      .then(() => {
        dispatch({
          type: actionType.UPDATE_THIS_USER_REVIEW_WARUNG,
          payload: { rating, review },
        });
        toast('Review warung berhasil di update');
      })
      .catch((err) => {
        dispatch({
          type: actionType.ERROR_WARUNG,
          payload: err,
        });
        toast(err.message);
      })
      .finally(() => {
        this.setState({
          visible: false,
        });
      });
  }

  _onModalCancel() {
    this.setState({
      visible: false,
    });
  }


  // Navigasi Peta
  _handleGetDirections() {
    const { position } = this.props.appSetting;
    const { lat, lng } = this.props.warung.selected;
    if (_.isEmpty(position)) return toast('Koordinat lokasi pengguna tidak ditemukan');
    return getDirections({
      source: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      destination: {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
      },
    });
  }

  _handleClickMakanan(item) {
    const { dispatch } = this.props;
    const { navigate } = this.props.navigation;
    dispatch({
      type: actionType.SELECT_DATA_MAKANAN,
      payload: { ...item, fromWarungPage: true },
    });
    navigate('Auth.DetailMakanan');
  }

  render() {
    const { visible, rating, review } = this.state;
    const { goBack, navigate } = this.props.navigation;
    const { title, maxRating } = this.props.appSetting;
    const { selected, reviews } = this.props.warung;
    const { listMakananBySelectedWarung } = this.props.makanan;

    return (
      <Container>
        <Header
          leftItem={{
            icon: 'arrow-back',
            funcPress: () => goBack(),
          }}
          rightItem={[{
            id: 1,
            icon: 'search',
            funcPress: () => navigate('Auth.Search'),
          }]}
          subtitle={title.toUpperCase()}
          title="Detail Warung"
        />

        <Content>
          <CardDetail
            data={selected}
            maxRating={maxRating}
          />
          <CardMakanan
            data={listMakananBySelectedWarung}
            maxRating={maxRating}
            selectedData={this._handleClickMakanan}
          />
          <CardReview
            data={reviews}
            maxRating={maxRating}
          />
        </Content>

        <Modal isVisible={visible}>
          <View style={styles.modalContentContainer}>
            <View style={styles.modal}>
              <TitleCard style={styles.modalTitleCard}>Input Review</TitleCard>
              <StarRating
                disabled={false}
                maxStars={maxRating}
                rating={rating}
                selectedStar={starRating => this.setState({ rating: starRating })}
                starColor={styles.colorStar}
              />
              <View style={styles.modalInputContainer}>
                <Item>
                  <Input
                    placeholder="Review"
                    value={review}
                    onChangeText={reviewInput => this.setState({ review: reviewInput })}
                  />
                </Item>
              </View>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={() => this._onModalCancel()}>
                  <Text style={styles.modalTextButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => this._onModalOk()}>
                  <Text style={styles.modalTextButton}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <FAB
          actions={[
            {
              key: 1,
              color: '#9b59b6',
              title: 'Navigasi Peta',
              onPress: () => this._handleGetDirections(),
              icon: 'map',
            },
            {
              key: 2,
              color: '#3498db',
              title: 'Beri Review',
              onPress: () => this._onModalShow(),
              icon: 'star',
            },
          ]}
        />
      </Container>
    );
  }
}

DetailWarung.propTypes = {
  navigation: PropTypes.shape().isRequired,
  warung: PropTypes.shape().isRequired,
  makanan: PropTypes.shape().isRequired,
  appSetting: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  warung: state.warung,
  makanan: state.makanan,
  appSetting: state.appSetting,
});
export default connect(mapStateToProps)(DetailWarung);
