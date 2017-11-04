import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './Login.Style';

const Title = ({ logo, title }) => (
  <View style={styles.titleContainer}>
    <Image source={logo} style={styles.logo} />
    <Text style={styles.title}>{title.toUpperCase()}</Text>
  </View>
);

Title.propTypes = {
  logo: PropTypes.oneOfType([PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
};

export default Title;
