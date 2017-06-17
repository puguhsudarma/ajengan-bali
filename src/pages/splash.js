import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Ajegli App',
      subtitle: 'Powered By React Native'
    };
  }

  componentWillMount(){
    const { dispatch } = this.props.navigation;
    setTimeout(() => {
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'login'})
        ],
      }));
    }, 1000);
  }

  render() {
    const { title, subtitle } = this.state;
    return (
      <LinearGradient
        start={{ x: 0.1, y: 0.1 }} end={{ x: 0.7, y: 0.9 }}
        colors={['#4B79A1', '#283E51']}
        style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#27ae60',
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
