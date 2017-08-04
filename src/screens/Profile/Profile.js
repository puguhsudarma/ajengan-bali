import React from 'react';
import {
  Container,
  Content,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import CardPrimary from './Profile.CardPrimary';
import CardSecondary from './Profile.CardSecondary';
import CardControl from './Profile.CardControl';

const Profile = ({ navigation, appSetting }) => {
  const { navigate } = navigation;
  const { title, userLogin } = appSetting;
  const {
    email,
    gambar,
    nama,
    alamat,
    telepon,
    username,
    loading,
  } = userLogin;

  return (
    <Container>
      <Header
        leftItem={{
          icon: 'menu',
          funcPress: () => navigate('DrawerOpen'),
        }}
        subtitle={title.toUpperCase()}
        title="Profile"
      />
      <Content>
        <CardPrimary
          email={email}
          gambar={gambar}
          nama={nama}
        />

        <CardSecondary
          alamat={alamat}
          telepon={telepon}
          username={username}
        />

        <CardControl
          loading={loading}
          onPress={() => { }}
        />
      </Content>
    </Container >
  );
};

Profile.propTypes = {
  navigation: PropTypes.shape().isRequired,
  appSetting: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
