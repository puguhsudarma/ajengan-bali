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
  }

  componentDidMount() {
    this.props.fetchWarung();
  }

  render() {
    const { appInfo, warung, makanan } = this.props;
    const { leftItem, rightItem } = this.header;
    return (
      <Container>
        <Header
          hasTabs
          subtitle={appInfo.title}
          title="Dashboard"
          leftItem={leftItem}
          rightItem={rightItem}
        />
        <Tabs>
          <Tab heading={<TabHeading><Icon name="albums" /><Text>Warung</Text></TabHeading>}>
            <ListWarung data={warung.listData} />
          </Tab>
          <Tab heading={<TabHeading><Icon name="restaurant" /><Text>Makanan</Text></TabHeading>}>
            <ListMakanan data={makanan.listData} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  appInfo: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
  warung: PropTypes.arrayOf().isRequired,
  makanan: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = state => ({
  appInfo: state.appInfo,
  warung: state.warung,
  makanan: state.makanan,
});
const mapDispatchToProps = dispatch => ({
  fetchWarung: () => dispatch(fetchWarung()),
  // fetchMakanan: () => dispatch(fetchMakanan()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
