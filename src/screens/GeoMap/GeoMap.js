import React, { Component } from 'react';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import MapWarung from './GeoMap.Map';
import firebase from '../../config/firebase';
import * as actionType from '../../actions/actionType';
import { toast } from '../../components/Toast/Toast';
import { regionFrom } from '../../libs/helper';

class GeoMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.__regionMap = {};

    this._regionMap();
    console.log(this.__regionMap);

    this._fetchWarung = this._fetchWarung.bind(this);
    this._onRegionChange = this._onRegionChange.bind(this);
  }

  componentWillMount() {
    this._fetchWarung();
  }

  _regionMap() {
    const { coords } = this.props.appSetting.position;
    const distance = 1000;

    this.__regionMap = regionFrom(coords.latitude, coords.longitude, distance);
  }

  _fetchWarung() {
    const { dispatch } = this.props;
    firebase.database().ref('warung')
      .orderByChild('softDelete')
      .equalTo(false)
      .once('value')
      .then((snapShot) => {
        const data = [];
        snapShot.forEach((snapChild) => {
          data.push({
            key: snapChild.key,
            ...snapChild.val(),
          });
        });
        dispatch({
          type: actionType.FETCH_DATA_LIST_WARUNG,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionType.ERROR_WARUNG,
          payload: err,
        });
        toast(err.message);
      });
  }

  _onRegionChange(param) {
    const { appSetting } = this.props;
    console.log(appSetting);
    console.log(param);
  }

  render() {
    const { list } = this.props.warung;
    const { title } = this.props.appSetting;
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header
          leftItem={{
            icon: 'menu',
            funcPress: () => navigate('DrawerOpen'),
          }}
          rightItem={[{
            id: 1,
            icon: 'search',
            funcPress: () => navigate('Auth.Search'),
          }]}
          subtitle={title.toUpperCase()}
          title="Peta Warung"
        />
        <MapWarung
          marker={list}
          onRegionChange={this._onRegionChange}
          regionMap={this.__regionMap}
        />
      </Container>
    );
  }
}

GeoMap.propTypes = {
  warung: PropTypes.shape().isRequired,
  appSetting: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  warung: state.warung,
  appSetting: state.appSetting,
});
export default connect(mapStateToProps)(GeoMap);
