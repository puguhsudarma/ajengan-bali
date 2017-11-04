import React, { Component } from 'react';
import {
  ActivityIndicator as Spinner,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Splash.Style';
import * as actionType from '../../actions/actionType';
import GeoLocation from '../../components/CoordinateGps/CoordinateGps';
import firebase from '../../config/firebase';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'Menyiapkan aplikasi...',
    };
    this.authListen = null;
  }

  async componentWillMount() {
    const { dispatch: navDispatch } = this.props.navigation;
    const { dispatch } = this.props;

    try {
      this.setState({ msg: 'Mencari lokasi koordinat...' });
      const position = await GeoLocation();
      dispatch({
        type: actionType.FETCH_DATA_COORDINATE_LOCATION,
        payload: position,
      });
      this.setState({ msg: 'Koordinat pengguna berhasil didapat...' });

      this.authListen = firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const { uid, displayName, email } = user;
          const detailUser = await firebase.database().ref(`users/${uid}`).once('value');
          dispatch({
            type: actionType.FETCH_DATA_THIS_USER,
            payload: {
              email,
              displayName,
              uid,
              ...detailUser.val(),
            },
          });
          return navDispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Auth.Dashboard' })],
          }));
        }
        return navDispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Unauth.Login' })],
        }));
      });
    } catch (err) {
      dispatch({
        type: actionType.ERROR_APP_SETTING,
        payload: err,
      });
      this.setState({ msg: err.message });
    }
  }

  componentWillUnmount() {
    if (this.authListen) {
      this.authListen();
    }
  }

  render() {
    const { msg } = this.state;
    const { title, logo, ver } = this.props.appSetting;
    return (
      <View style={styles.wrapper}>
        <StatusBar barStyle="light-content" backgroundColor="#004D40" />
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>
          {`\nSelamat Datang di ${title}\nAjengan Bali App\n\n`}
        </Text>
        <Text style={styles.subtitle}>Temukan warung kuliner khas{'\n'}Pulau Dewata Bali{'\n'}</Text>
        <Text style={styles.ver}>ver. {ver}{'\n\n'}</Text>
        <View style={styles.loadingContainer}>
          <Spinner color="#fff" style={styles.spinner} />
          <Text style={styles.loadingMsg}>{`  ${msg}`}</Text>
        </View>
      </View>
    );
  }
}

Splash.propTypes = {
  dispatch: PropTypes.func.isRequired,
  appSetting: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
});
export default connect(mapStateToProps)(Splash);
