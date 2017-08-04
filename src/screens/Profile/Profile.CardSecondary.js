import React from 'react';
import {
  Card,
  CardItem,
  Body,
  Icon,
  Text,
} from 'native-base';
import PropTypes from 'prop-types';
import styles from './Profile.Style';
import TitleCard from '../../components/TitleCard/TitleCard';

const CardSecondary = ({ username, alamat, telepon }) => (
  <Card style={styles.card}>
    <CardItem header>
      <Body>
        <TitleCard>Data Profil</TitleCard>
      </Body>
    </CardItem>
    <CardItem>
      <Icon active style={styles.iconDetail} name="people" />
      <Text>{username}</Text>
    </CardItem>
    <CardItem>
      <Icon active style={styles.iconDetail} name="pin" />
      <Text>{alamat}</Text>
    </CardItem>
    <CardItem>
      <Icon active style={styles.iconDetail} name="call" />
      <Text>{telepon}</Text>
    </CardItem>
  </Card>
);

CardSecondary.propTypes = {
  username: PropTypes.string.isRequired,
  alamat: PropTypes.string.isRequired,
  telepon: PropTypes.string.isRequired,
};

export default CardSecondary;
