import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import FormInput from './Search.FormInput';
import Result from './Search.Result';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearched: false,
    };
  }

  render() {
    const { isSearched } = this.state;
    const { navigate } = this.props.navigation;
    const { title, maxRating } = this.props.appSetting;

    return (
      <Container>
        <Header
          leftItem={{
            icon: 'menu',
            funcPress: () => navigate('DrawerOpen'),
          }}
          subtitle={title.toUpperCase()}
          title="Search"
        />
        <Content>
          <FormInput
            InputJenisData={{}}
            InputKategoriData={{}}
            onChangeText={() => { }}
            onSearch={() => { }}
          />
          <Result
            data={[]}
            isSearched={isSearched}
            maxRating={maxRating}
            navigate={navigate}
          />
        </Content>
      </Container>
    );
  }
}

Search.propTypes = {
  navigation: PropTypes.shape().isRequired,
  appSetting: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  appSetting: state.appSetting,
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Search);
