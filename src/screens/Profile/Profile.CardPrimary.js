import React from 'react';
import { Image } from 'react-native';
import {
  Card,
  CardItem,
  View,
} from 'native-base';
import PropTypes from 'prop-types';
import styles from './Profile.Style';

const CardPrimary = ({ gambar }) => (
  <Card style={styles.card}>
    <CardItem style={styles.cardItem}>
      <View style={styles.imageProfileContainer}>
        <Image source={gambar} style={styles.imageProfile} />
      </View>
    </CardItem>
  </Card>
);

CardPrimary.propTypes = {
  gambar: PropTypes.oneOfType([PropTypes.number]).isRequired,
};

export default CardPrimary;
