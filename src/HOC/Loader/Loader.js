import React from 'react';
import { Spinner, View } from 'native-base';
import { isEmpty } from 'lodash';
import styles from './Loader.Style';

const LoaderHOC = propName => WrappedComponent => props => (
  isEmpty(props[propName]) ?
    <View style={styles.container}>
      <Spinner color="blue" />
    </View>
    :
    <WrappedComponent {...props} />
);

export default LoaderHOC;
