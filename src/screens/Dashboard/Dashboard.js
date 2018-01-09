import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  // Icon,
  // Text,
  // Tabs,
  // Tab,
  // TabHeading,
  Content,
} from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from '../../components/Header/Header';
import ListWarung from './Dashboard.Warung';
// import ListMakanan from './Dashboard.Makanan';
import * as actionType from '../../actions/actionType';
import { toast } from '../../components/Toast/Toast';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warungIsFetching: false,
      // makananIsFetching: false,
    };
    this.url = {
      warung: 'https://us-central1-ajengan-bali.cloudfunctions.net/rekomendasiWarung',
      // makanan: 'https://us-central1-ajengan-bali.cloudfunctions.net/rekomendasiMakanan',
    };
    this._fetchWarung = this._fetchWarung.bind(this);
    // this._fetchMakanan = this._fetchMakanan.bind(this);
    this._handleClickItemWarung = this._handleClickItemWarung.bind(this);
    // this._handleClickItemMakanan = this._handleClickItemMakanan.bind(this);
  }

  componentWillMount() {
    Promise.all([
      this._fetchWarung(),
      // this._fetchMakanan(),
    ]);
  }

  _fetchWarung() {
    const { dispatch, appSetting } = this.props;
    const dataPost = {
      lat: appSetting.position.coords.latitude,
      lng: appSetting.position.coords.longitude,
      uid: appSetting.userLogin.uid,
    };

    this.setState({ warungIsFetching: true });
    return axios.post(this.url.warung, dataPost)
      .then(({ data }) => {
        dispatch({
          type: actionType.FETCH_DATA_LIST_WARUNG,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionType.ERROR_WARUNG,
          payload: err,
        });
        toast(err.message);
      })
      .finally(() => {
        this.setState({ warungIsFetching: false });
      });
  }

  // _fetchMakanan() {
  //   const { dispatch, appSetting } = this.props;
  //   const dataPost = {
  //     lat: appSetting.position.coords.latitude,
  //     lng: appSetting.position.coords.longitude,
  //     uid: appSetting.userLogin.uid,
  //   };

  //   this.setState({ makananIsFetching: true });
  //   return axios.post(this.url.makanan, dataPost)
  //     .then(({ data }) => {
  //       dispatch({
  //         type: actionType.FETCH_DATA_LIST_MAKANAN,
  //         payload: data,
  //       });
  //     })
  //     .catch((err) => {
  //       dispatch({
  //         type: actionType.ERROR_MAKANAN,
  //         payload: err,
  //       });
  //       toast(err.message);
  //     })
  //     .finally(() => {
  //       this.setState({ makananIsFetching: false });
  //     });
  // }

  _handleClickItemWarung(item) {
    const { dispatch, navigation } = this.props;
    dispatch({
      type: actionType.SELECT_DATA_WARUNG,
      payload: item,
    });
    navigation.navigate('Auth.DetailWarung');
  }

  // _handleClickItemMakanan(item) {
  //   const { dispatch, navigation } = this.props;
  //   dispatch({
  //     type: actionType.SELECT_DATA_MAKANAN,
  //     payload: {
  //       ...item,
  //       fromWarungPage: false,
  //     },
  //   });
  //   dispatch({
  //     type: actionType.SELECT_DATA_WARUNG,
  //     payload: {
  //       ...item.warung,
  //       key: item.warungId,
  //       km: item.km,
  //     },
  //   });
  //   navigation.navigate('Auth.DetailMakanan');
  // }

  render() {
    const {
      // makananIsFetching,
      warungIsFetching,
    } = this.state;
    const {
      appSetting,
      warung,
      // makanan,
    } = this.props;
    const {
      navigate,
    } = this.props.navigation;
    return (
      <Container>
        <Header
          subtitle={appSetting.title.toUpperCase()}
          title="Dashboard"
          rightItem={[
            {
              id: 1,
              icon: 'search',
              funcPress: () => navigate('Auth.Search'),
            },
            {
              id: 2,
              icon: 'people',
              funcPress: () => navigate('Auth.Profile'),
            },
          ]}
        />
        <Content>
          <ListWarung
            loading={warungIsFetching}
            data={warung.list}
            navigate={navigate}
            selected={this._handleClickItemWarung}
            maxRating={appSetting.maxRating}
            refreshCallback={this._fetchWarung}
          />
        </Content>

        {/* <Tabs>
          <Tab heading={<TabHeading><Icon name="ios-restaurant" /><Text>Warung</Text></TabHeading>}>
            <ListWarung
              loading={warungIsFetching}
              data={warung.list}
              navigate={navigate}
              selected={this._handleClickItemWarung}
              maxRating={appSetting.maxRating}
              refreshCallback={this._fetchWarung}
            />
          </Tab>
          <Tab heading={<TabHeading><Icon name="restaurant" /><Text>Makanan</Text></TabHeading>}>
            <ListMakanan
              loading={makananIsFetching}
              data={makanan.list}
              navigate={navigate}
              selected={this._handleClickItemMakanan}
              maxRating={appSetting.maxRating}
              refreshCallback={this._fetchMakanan}
            />
          </Tab>
        </Tabs> */}
      </Container>
    );
  }
}

Dashboard.propTypes = {
  appSetting: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
  warung: PropTypes.shape().isRequired,
  // makanan: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
  warung: state.warung,
  makanan: state.makanan,
});
export default connect(mapStateToProps)(Dashboard);
