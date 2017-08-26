import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import * as actionCreator from '../../actions/actionCreator';
import firebase from '../../config/firebase';
import { validateEmail } from '../../libs/helper';
import Title from './Login.Title';
import Form from './Login.Form';
import ButtonSignUp from './Login.SignUpButton';
import styles from './Login.Style';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      email: '',
      password: '',
      loading: false,
    };
    this._loginButton = this._loginButton.bind(this);
  }

  _loginButton() {
    this.setState({ loading: true });
    const { email, password } = this.state;
    const { dispatch: navDispatch } = this.props.navigation;
    const { dispatch } = this.props;

    // validation
    // empty
    if (email === '' || password === '') {
      this.setState({ loading: false, msg: 'Email dan password tidak boleh kosong' });
      return;
    }

    // email pattern
    if (!validateEmail(email)) {
      this.setState({ loading: false, msg: 'Email tidak valid' });
      return;
    }

    // password length
    if (password.length < 6) {
      this.setState({ loading: false, msg: 'Password harus lebih dari 6 karakter' });
      return;
    }

    // login process
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        const { displayName, email: emailLogin, uid } = res;
        dispatch(actionCreator.setUser({ displayName, email: emailLogin, uid }));
        navDispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Unauth.Auth' })],
        }));
      })
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          this.setState({ loading: false, msg: 'Akun pengguna tidak ditemukan.' });
          return;
        }
        this.setState({ loading: false, msg: err.message });
      });
  }

  render() {
    const { title, logo } = this.props.appSetting;
    const { navigate } = this.props.navigation;
    const { msg, loading } = this.state;

    return (
      <View style={styles.container}>
        <Title title={title} logo={logo} />
        <View style={styles.formContainer}>
          <Form
            loading={loading}
            onChangeTextEmail={email => this.setState({ email })}
            onChangeTextPassword={password => this.setState({ password })}
            onLogin={() => this._loginButton()}
            msg={msg}
          />
          <ButtonSignUp
            loading={loading}
            navigate={() => navigate('Unauth.Pendaftaran')}
          />
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  appSetting: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
});
export default connect(mapStateToProps)(Login);
