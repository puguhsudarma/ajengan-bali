import React from 'react';
import { Spinner, View } from 'native-base';
import _ from 'lodash';

const LoaderHOC = propName => WrappedComponent => props => (
  _.isEmpty(props[propName]) ?
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Spinner color="blue" />
    </View>
    :
    <WrappedComponent {...props} />
);

export default LoaderHOC;
