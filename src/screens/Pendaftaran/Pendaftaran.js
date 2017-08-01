import React, { Component } from 'react';
import {
  Container,
  Content,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      telp: '',
    };
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
            funcPress: goBack(),
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
            onSignUp={() => { }}
          />
        </Content>
      </Container >
    );
  }
}

Pendaftaran.propTypes = {
  appSetting: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Pendaftaran);
