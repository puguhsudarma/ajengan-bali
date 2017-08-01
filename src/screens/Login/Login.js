import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Title from './Login.Title';
import Form from './Login.Form';
import ButtonSignUp from './Login.SignUpButton';
import styles from './Login.Style';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      username: '',
      password: '',
      loading: false,
    };
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
            onChangeTextUsername={username => this.setState({ username })}
            onChangeTextPassword={password => this.setState({ password })}
            onLogin={() => { }}
            msg={msg}
          />
          <ButtonSignUp
            loading={loading}
            navigate={() => navigate('pendaftaran')}
          />
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  appSetting: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
