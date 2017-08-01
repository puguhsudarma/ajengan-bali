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

const CardDetailWarung = ({ nama, range, daerah, alamat, displayButton, navigate }) => (
  <Card style={styles.card}>
    <CardItem>
      <Body>
        <TitleCard>Informasi Warung</TitleCard>
      </Body>
    </CardItem>
    <CardItem>
      <Icon active name="home" />
      <Text>{nama}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="bus" />
      <Text>{`${range} Km`}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="pin" />
      <Text>{daerah}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="map" />
      <Text>{alamat}</Text>
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
  nama: PropTypes.string.isRequired,
  range: PropTypes.number.isRequired,
  daerah: PropTypes.string.isRequired,
  alamat: PropTypes.string.isRequired,
  displayButton: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default CardDetailWarung;
