import React from 'react';
import {
  Card,
  CardItem,
  Body,
  Icon,
  Text,
  Button,
} from 'native-base';
import PropTypes from 'prop-types';
import TitleCard from '../../components/TitleCard/TitleCard';
import styles from './DetailMakanan.Style';

const CardDetailWarung = ({ item, displayButton, navigate }) => (
  <Card style={styles.card}>
    <CardItem>
      <Body>
        <TitleCard>Informasi Warung</TitleCard>
      </Body>
    </CardItem>
    <CardItem>
      <Icon active name="home" style={styles.iconColor} />
      <Text>{item.nama}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="bus" style={styles.iconColor} />
      <Text>{`${item.km} Km`}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="pin" style={styles.iconColor} />
      <Text>{item.daerah}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="map" style={styles.iconColor} />
      <Text>{item.alamat}</Text>
    </CardItem>
    {
      !displayButton &&
      <CardItem>
        <Icon active name="book" />
        <Button rounded onPress={navigate}>
          <Text>Halaman Warung</Text>
        </Button>
      </CardItem>
    }
  </Card>
);

CardDetailWarung.propTypes = {
  item: PropTypes.shape().isRequired,
  displayButton: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default CardDetailWarung;
