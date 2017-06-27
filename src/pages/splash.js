import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import {
  Spinner,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { GeoLocation, } from '../components';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Ajegli App',
      subtitle: 'Powered By React Native'
    };
  }

  componentWillMount() {
    // const { dispatch } = this.props.navigation;
    // setTimeout(() => {
    //   dispatch(NavigationActions.reset({
    //     index: 0,
    //     actions: [
    //       NavigationActions.navigate({routeName: 'login'})
    //     ],
    //   }));
    // }, 1000);
    // const SETTING_KEY = 'position';
    GeoLocation(
      position => {
        console.log(position);
      },
      err => {
        console.log(err);
      }
    );
  }

  render() {
    const { title, subtitle } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <Spinner />
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#3498db',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleWrapper: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 45,
    // fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
  },
  subtitle: {
    color: '#fff',
    fontWeight: '300',
    paddingBottom: 20
  },
});
