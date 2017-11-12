import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Item, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getDirections from 'react-native-google-maps-directions';
import { isEmpty } from 'lodash';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import * as actionType from '../../actions/actionType';
import firebase from '../../config/firebase';
import { toast } from '../../components/Toast/Toast';
import Header from '../../components/Header/Header';
import FAB from '../../components/FAB/FAB';
import TitleCard from '../../components/TitleCard/TitleCard';
import CardDetail from './DetailMakanan.CardDetail';
import CardDetailWarung from './DetailMakanan.CardDetailWarung';
import CardReview from './DetailMakanan.CardReview';
import styles from './DetailMakanan.Style';

class DetailMakanan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      review: '',
      visible: false,
    };

    this._onModalShow = this._onModalShow.bind(this);
    this._onModalOk = this._onModalOk.bind(this);
    this._onModalCancel = this._onModalCancel.bind(this);
    this._handleGetDirections = this._handleGetDirections.bind(this);

    this.__listenFetchReview = null;
    this._fetchListReview = this._fetchListReview.bind(this);
    this.___handleSuccessListReview = this.___handleSuccessListReview.bind(this);
    this.___handleErrorListReview = this.___handleErrorListReview.bind(this);
  }

  componentDidMount() {
    this._fetchListReview();
  }

  componentWillUnmount() {
    if (this.__listenFetchReview) {
      this.__listenFetchReview
        .off('value', this.___handleSuccessListReview, this.___handleErrorListReview);
    }
  }

  // Fetch List Review
  _fetchListReview() {
    const { makanan } = this.props;
    this.__listenFetchReview = firebase.database().ref(`rating/makanan/${makanan.selected.key}`)
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
        type: actionType.FETCH_DATA_LIST_REVIEW_MAKANAN,
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
      type: actionType.ERROR_MAKANAN,
      payload: err,
    });
    toast(err.message);
  }

  // Handle Modal
  _onModalShow() {
    const { rating, review } = this.props.makanan.thisUserReview;
    this.setState({
      visible: true,
      rating,
      review,
    });
  }

  _onModalOk() {
    const { rating, review } = this.state;
    const { dispatch, makanan, appSetting } = this.props;

    firebase.database()
      .ref(`rating/makanan/${makanan.selected.key}/${appSetting.userLogin.uid}`)
      .update({ rating, review })
      .then(() => {
        dispatch({
          type: actionType.UPDATE_THIS_USER_REVIEW_MAKANAN,
          payload: { rating, review },
        });
        toast('Review warung berhasil di update');
      })
      .catch((err) => {
        dispatch({
          type: actionType.ERROR_MAKANAN,
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
    if (isEmpty(position)) return toast('Koordinat lokasi pengguna tidak ditemukan');
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

  render() {
    const { rating, review, visible } = this.state;
    const { makanan, warung, appSetting } = this.props;
    const { title, maxRating } = appSetting;
    const { goBack, navigate } = this.props.navigation;

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
              icon: 'search',
              funcPress: () => navigate('Auth.Search'),
            },
          ]}
          subtitle={title.toUpperCase()}
          title="Detail Makanan"
        />

        <Content>
          <CardDetail
            item={makanan.selected}
            maxRating={maxRating}
          />

          <CardDetailWarung
            item={warung.selected}
            displayButton={makanan.selected.fromWarungPage}
            navigate={() => navigate('Auth.DetailWarung')}
          />

          <CardReview
            data={makanan.reviews}
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

DetailMakanan.propTypes = {
  appSetting: PropTypes.shape().isRequired,
  warung: PropTypes.shape().isRequired,
  makanan: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
  warung: state.warung,
  makanan: state.makanan,
});
export default connect(mapStateToProps)(DetailMakanan);
