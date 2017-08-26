import React, { Component } from 'react';
import {
  ActivityIndicator as Spinner,
  Text,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from './Splash.Style';
import GeoLocation from '../../components/CoordinateGps/CoordinateGps';
import firebase from '../../config/firebase';
import * as actionCreator from '../../actions/actionCreator';

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
    this.setState({ msg: 'Mencari lokasi koordinat...' });
    try {
      const pos = await GeoLocation();
      dispatch(actionCreator.setLocation(pos));
      this.setState({ msg: 'Koordinat pengguna berhasil didapat...' });
      this.authListen = firebase.auth().onAuthStateChanged((user) => {
        this.setState({ msg: 'Menyiapkan aplikasi...' });
        if (user) {
          const { uid, displayName, email } = user;
          dispatch(actionCreator.setUser({ uid, displayName, email }));
          navDispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Unauth.Auth' })],
          }));
          return;
        }
        navDispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Unauth.Login' })],
        }));
      });
    } catch (err) {
      this.setState({ msg: err });
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
  appSetting: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
});
export default connect(mapStateToProps)(Splash);
