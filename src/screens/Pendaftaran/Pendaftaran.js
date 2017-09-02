import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { validateEmail } from '../../libs/helper';
import firebase from '../../config/firebase';
import * as actionCreator from '../../actions/actionCreator';
import Header from '../../components/Header/Header';
import Form from './Pendaftaran.Form';

class Pendaftaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      msg: '',
      nama: '',
      username: '',
      password: '',
      email: '',
      alamat: '',
      telepon: '',
    };
    this._buttonDaftar = this._buttonDaftar.bind(this);
  }

  async _buttonDaftar() {
    this.setState({ loading: true });
    const { nama, username, password, email, alamat, telepon } = this.state;
    const { dispatch: navDispatch } = this.props.navigation;
    const { dispatch } = this.props;

    // validation
    // empty
    if (
      nama === '' ||
      username === '' ||
      password === '' ||
      email === '' ||
      alamat === '' ||
      telepon === ''
    ) {
      this.setState({ loading: false, msg: 'Form tidak boleh kosong' });
      return;
    }

    // email validation
    if (!validateEmail(email)) {
      this.setState({ loading: false, msg: 'Email tidak valid' });
      return;
    }

    // password harus >= 6 karakter
    if (password.length < 6) {
      this.setState({ loading: false, msg: 'Password harus lebih dari 6 karakter' });
      return;
    }

    // proses daftar
    try {
      const dataWrite = {
        alamat,
        email,
        username,
        nama,
        level: 1,
        softDelete: false,
        telp: telepon,
      };
      const daftar = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const update = await daftar.updateProfile({ displayName: nama });
      await firebase.database().ref(`users/${update.uid}`).set(dataWrite);
      dispatch(actionCreator.setUser({ email, displayName: update.displayName, uid: update.uid }));
      navDispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Unauth.Auth' })],
      }));
    } catch (err) {
      this.setState({ loading: false, msg: err.message });
    }
  }

  render() {
    const { loading, msg } = this.state;
    const { goBack } = this.props.navigation;
    const { title } = this.props.appSetting;

    return (
      <Container>
        <Header
          leftItem={{
            icon: 'arrow-back',
            funcPress: () => goBack(),
          }}
          title="Pendaftaran"
          subtitle={title.toUpperCase()}
        />

        <Content>
          <Form
            loading={loading}
            msg={msg}
            onChangeText={{
              nama: nama => this.setState({ nama }),
              username: username => this.setState({ username }),
              password: password => this.setState({ password }),
              email: email => this.setState({ email }),
              alamat: alamat => this.setState({ alamat }),
              telepon: telepon => this.setState({ telepon }),
            }}
            onSignUp={() => this._buttonDaftar()}
          />
        </Content>
      </Container >
    );
  }
}

Pendaftaran.propTypes = {
  appSetting: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
});
export default connect(mapStateToProps)(Pendaftaran);
