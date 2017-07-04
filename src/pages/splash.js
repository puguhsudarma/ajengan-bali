import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Spinner,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { GeoLocation, } from '../components';
import { checkLogin, } from '../firebase/auth';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Ajegli',
      subtitle: 'Powered By React Native',
      msg: 'Mencari koordinat pengguna...',
      colorMsg: WHITE,
    };
  }

  async componentWillMount() {
    const { dispatch } = this.props.navigation;
    // Get Geolocation
    // ----------------------
    try {
      await GeoLocation();
      this.setState({ msg: 'Koordinat pengguna berhasil didapat...', colorMsg: GREEN });
    } catch (err) {
      this.setState({ msg: err, colorMsg: RED });
      console.log(err);
    }

    // Check current session
    // ----------------------
    try {
      const check = await checkLogin();
      this.setState({ msg: 'Menyiapkan aplikasi...', colorMsg: WHITE, });
      setTimeout(() => {
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: check ? 'Authorized' : 'login' })],
        }));
      }, 100);
    } catch (err) {
      this.setState({ msg: err, colorMsg: RED });
      console.log(err);
    }
  }

  render() {
    const { title, subtitle, msg, colorMsg, } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <View>
            <Spinner color='#fff' />
            <Text style={{ color: colorMsg, top: -20, }}>{msg}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    );
  }
}

const RED = '#e74c3c';
const GREEN = '#2ecc71';
const WHITE = '#fff';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#3498db',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleWrapper: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 45,
    textAlign: 'center',
    paddingTop: 5,
  },
  subtitle: {
    color: '#fff',
    fontWeight: '300',
    paddingBottom: 20
  },
});
