import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as ActionCreator from '../actions/ActionCreator';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { fetchWarung, warung } = this.props;
    fetchWarung([{ nama: 'warung kalasan' }]);
    console.log(warung);
  }

  render() {
    return (
      <View>
        <Text>It Work!</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  warung: state.warung,
});

const mapDispatchToProps = dispatch => ({
  fetchWarung: payload => dispatch(ActionCreator.fetchWarung(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
