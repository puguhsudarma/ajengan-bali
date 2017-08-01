import React, { Component } from 'react';
import {
  ActivityIndicator as Spinner,
  Text,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { NavigationActions } from 'react-navigation';
import styles from './Splash.Style';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'Ini Adalah pesan loading...',
    };
  }

  // async componentWillMount() {
  //   const { dispatch } = this.props.navigation;
  //   // Get Geolocation
  //   // ----------------------
  //   try {
  //     await GeoLocation();
  //     this.setState({ msg: 'Koordinat pengguna berhasil didapat...', colorMsg: GREEN });
  //   } catch (err) {
  //     this.setState({ msg: err, colorMsg: RED });
  //     console.log(err);
  //   }

  //   // Check current session
  //   // ----------------------
  //   try {
  //     const check = await checkLogin();
  //     console.log(check);
  //     this.setState({ msg: 'Menyiapkan aplikasi...', colorMsg: WHITE, });
  //     setTimeout(() => {
  //       dispatch(NavigationActions.reset({
  //         index: 0,
  //         actions: [NavigationActions.navigate({ routeName: check ? 'Authorized' : 'login' })],
  //       }));
  //     }, 100);
  //   } catch (err) {
  //     this.setState({ msg: err, colorMsg: RED });
  //     console.log(err);
  //   }
  // }

  render() {
    const { msg } = this.state;
    const { title, logo, ver } = this.props.appSetting;
    return (
      <View style={styles.wrapper}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>
          {`\nSelamat Datang di ${title}\nAjengan Bali App\n\n`}
        </Text>
        <Text style={styles.subtitle}>Temukan warung kuliner khas{'\n'}Pulau Dewata{'\n'}</Text>
        <Text style={styles.ver}>ver. {ver}{'\n\n'}</Text>
        <View style={styles.loadingContainer}>
          <Spinner color="#fff" style={styles.spinner} />
          <Text style={styles.loadingMsg}>{msg}</Text>
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
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
