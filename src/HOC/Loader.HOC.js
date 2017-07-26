import React, { Component } from 'react';
import { Spinner, View } from 'native-base';
import _ from 'lodash';

const LoaderHOC = propName => WrappedComponent => (
  class Loader extends Component {
    render() {
      return _.isEmpty(this.props[propName]) ?
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Spinner color="blue" />
        </View>
        :
        <WrappedComponent {...this.props} />;
    }
  }
);

export default LoaderHOC;
