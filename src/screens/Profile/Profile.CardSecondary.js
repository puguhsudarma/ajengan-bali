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

const Item = ({ icon, item }) => (
  <CardItem>
    <Icon active style={styles.iconDetail} name={icon} />
    <Text>{item}</Text>
  </CardItem>
);

Item.propTypes = {
  icon: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};

const CardSecondary = ({ item }) => (
  <Card style={styles.card}>
    <CardItem header>
      <Body>
        <TitleCard>Data Profil</TitleCard>
      </Body>
    </CardItem>
    <Item icon="people" item={item.nama} />
    <Item icon="outlet" item={item.username} />
    <Item icon="mail" item={item.email} />
    <Item icon="home" item={item.alamat} />
    <Item icon="call" item={item.telp.toString()} />
  </Card>
);

CardSecondary.propTypes = {
  item: PropTypes.shape().isRequired,
};

export default CardSecondary;
