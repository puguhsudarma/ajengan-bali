import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { DrawerItems } from 'react-navigation';
import backgroundDrawer from '../../images/materialDrawer.png';
import profileImage from '../../images/avatar5.png';
import styles from './Drawer.Style';

// FIXME: 07/07/2017 Reroet -> fixing drawer link router
const Drawer = ({ property, nama, email }) => (
  <ScrollView>
    <Image source={backgroundDrawer} style={styles.backgroundDrawer}>
      <View style={styles.containerDrawerContent}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.textName}>{nama}</Text>
        <Text style={styles.textEmail}>{email}</Text>
      </View>
    </Image>
    <DrawerItems {...property} />
  </ScrollView >
);

Drawer.propTypes = {
  property: PropTypes.shape().isRequired,
  nama: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Drawer;
