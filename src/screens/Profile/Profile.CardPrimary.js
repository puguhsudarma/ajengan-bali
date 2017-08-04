import React from 'react';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
} from 'native-base';
import PropTypes from 'prop-types';
import styles from './Profile.Style';

const CardPrimary = ({ gambar, nama, email }) => (
  <Card style={styles.card}>
    <CardItem>
      <Thumbnail source={{ uri: gambar }} style={styles.imageProfile} />
      <Text style={styles.primaryCardNama}>{nama}</Text>
      <Text style={styles.primaryCardEmail}>{email}</Text>
    </CardItem>
  </Card>
);

CardPrimary.propTypes = {
  gambar: PropTypes.string.isRequired,
  nama: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default CardPrimary;
