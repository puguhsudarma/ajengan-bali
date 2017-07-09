import React, { Component } from 'react';
import { DrawerItems } from 'react-navigation';
import { View, Text, Image, ScrollView } from 'react-native';
import backgroundDrawer from '../images/materialDrawer.png';
import profileImage from '../images/avatar5.png';
import { userUid, } from '../firebase/auth';
import { readOnce, } from '../firebase/database';

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      email: '',
    };
  }

  async componentDidMount() {
    try {
      const uid = await userUid();
      const { nama, email } = await readOnce(`users/${uid}`);
      this.setState({ nama, email, });
    } catch (err) {
      console.log(err);
    }
  }

  // FIXME: 07/07/2017 Reroet -> fixing drawer link router
  render() {
    const { nama, email, } = this.state;
    let { property, } = this.props;
    console.log(property);
    console.log(DrawerItems);
    return (
      <ScrollView>
        <Image source={backgroundDrawer} style={{
          flex: 1,
          height: 200,
          resizeMode: 'stretch',
        }}>
          <View style={{
            justifyContent: 'flex-end',
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, .2),',
            paddingBottom: 20,
            paddingHorizontal: 20,
          }}>
            <Image source={profileImage} style={{
              width: 70,
              height: 70,
              borderRadius: 500,
              marginBottom: 10,
              borderColor: '#fff',
              borderWidth: 1,
            }} />
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16, }}>{nama}</Text>
            <Text style={{ color: '#fff', }}>{email}</Text>
          </View>
        </Image>
        <DrawerItems {...property} />
      </ScrollView >
    );
  }
}

export default Drawer;