import React, { Component } from 'react';
import { DrawerItems } from 'react-navigation';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import backgroundDrawer from '../images/materialDrawer.png';
import profileImage from '../images/avatar5.png';

class Drawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { property } = this.props;
    return (
      <ScrollView>
        <Image source={backgroundDrawer} style={{
          flex: 1,
          height: 200,
        }}>
          <View style={{
            justifyContent: 'flex-end',
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, .2),',
            paddingBottom: 20,
            paddingHorizontal: 20,
          }}>
            <Image source={profileImage} style={{ width: 70, height: 70, borderRadius: 500, marginBottom: 10, resizeMode: 'center' }} />
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16, }}>I Wayan Puguh Sudarma</Text>
            <Text style={{ color: '#fff', }}>wayanpuguhsudarma@gmail.com</Text>
          </View>
        </Image>
        <DrawerItems {...property} />
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({

});

export default Drawer;