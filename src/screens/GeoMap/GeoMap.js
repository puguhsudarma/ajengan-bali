import React, { Component } from 'react';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import MapWarung from './GeoMap.Map';

class GeoMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const initRegion = {

    };
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
          onRegionChange={() => { }}
          regionMap={initRegion}
        />
      </Container>
    );
  }
}

GeoMap.propTypes = {
  warung: PropTypes.shape().isRequired,
  appSetting: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  warung: state.warung,
  appSetting: state.appSetting,
});
export default connect(mapStateToProps)(GeoMap);
