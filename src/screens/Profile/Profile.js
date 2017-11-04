import React, { Component } from 'react';
import {
  Container,
  Content,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Header from '../../components/Header/Header';
import CardPrimary from './Profile.CardPrimary';
import CardSecondary from './Profile.CardSecondary';
import CardControl from './Profile.CardControl';
import * as actionType from '../../actions/actionType';
import firebase from '../../config/firebase';
import { toast } from '../../components/Toast/Toast';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this._onPressLogout = this._onPressLogout.bind(this);
  }

  _onPressLogout() {
    const { dispatch, navigation } = this.props;
    firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: actionType.LOGOUT_THIS_USER,
        });
        navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'Unauth.Login',
            }),
          ]
        }));
      })
      .catch((err) => {
        dispatch({
          type: actionType.ERROR_APP_SETTING,
          payload: err,
        });
        toast(err.message);
      });
  }

  render() {
    const { loading } = this.state;
    const { navigate } = this.props.navigation;
    const { title, userLogin: user } = this.props.appSetting;

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
          <CardPrimary gambar={user.avatar} />
          <CardSecondary item={user} />
          <CardControl loading={loading} onPress={this._onPressLogout} />
        </Content>
      </Container >
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.shape().isRequired,
  appSetting: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
});
export default connect(mapStateToProps)(Profile);
