import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Icon,
  Text,
  Tabs,
  Tab,
  TabHeading,
} from 'native-base';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import ListWarung from './Dashboard.Warung';
import ListMakanan from './Dashboard.Makanan';
import { fetchWarung, fetchMakanan } from './Dashboard.Action';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;
    this.header = {
      leftItem: {
        icon: 'menu',
        funcPress: () => navigate('DrawerOpen'),
      },
      rightItem: [
        {
          id: 1,
          icon: 'search',
          funcPress: () => navigate('Auth.Search'),
        },
        {
          id: 2,
          icon: 'refresh',
          funcPress: () => { },
        },
      ],
    };

    this._fetchWarung = this._fetchWarung.bind(this);
    this._fetchMakanan = this._fetchMakanan.bind(this);
  }

  componentDidMount() {
    this._fetchWarung();
    // this._fetchMakanan();
  }

  _fetchWarung() {
    this.props.fetchWarung();
  }

  _fetchMakanan() {
    this.props.fetchMakanan();
  }

  render() {
    const { appSetting, warung, makanan } = this.props;
    const { leftItem, rightItem } = this.header;
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header
          hasTabs
          subtitle={appSetting.title}
          title="Dashboard"
          leftItem={leftItem}
          rightItem={rightItem}
        />
        <Tabs>
          <Tab heading={<TabHeading><Icon name="ios-restaurant" /><Text>Warung</Text></TabHeading>}>
            <ListWarung
              loading={warung.isFetching}
              data={warung.listData}
              navigate={navigate}
              refreshCallback={this._fetchWarung}
            />
          </Tab>
          <Tab heading={<TabHeading><Icon name="restaurant" /><Text>Makanan</Text></TabHeading>}>
            <ListMakanan
              loading={makanan.isFetching}
              data={makanan.listData}
              navigate={navigate}
              refreshCallback={this._fetchMakanan}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  appSetting: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
  warung: PropTypes.shape().isRequired,
  makanan: PropTypes.shape().isRequired,
  fetchWarung: PropTypes.func.isRequired,
  fetchMakanan: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
  warung: state.warung,
  makanan: state.makanan,
});
const mapDispatchToProps = dispatch => ({
  fetchWarung: () => dispatch(fetchWarung()),
  fetchMakanan: () => dispatch(fetchMakanan()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
