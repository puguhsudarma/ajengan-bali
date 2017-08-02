import React from 'react';
import { Image } from 'react-native';
import {
  Card,
  CardItem,
  Body,
  Icon,
  Text,
} from 'native-base';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import TitleCard from '../../components/TitleCard/TitleCard';
import styles from './DetailWarung.Style';

const CardDetail = ({ nama, gambar, range, daerah, alamat, deskripsi, rating, maxRating }) => (
  <Card style={styles.card}>
    <CardItem>
      <Body>
        <TitleCard>{nama}</TitleCard>
      </Body>
    </CardItem>
    <CardItem cardBody>
      <Image style={styles.warungImage} resizeMode="center" source={{ uri: gambar }} />
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
      <Icon active name="md-map" />
      <Text>{alamat}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="list" />
      <Text>{deskripsi}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="md-star" />
      <StarRating
        disabled
        starSize={30}
        maxStars={maxRating}
        rating={rating}
        starColor={styles.colorStar}
      />
    </CardItem>
  </Card>
);

CardDetail.propTypes = {
  nama: PropTypes.string.isRequired,
  gambar: PropTypes.string.isRequired,
  range: PropTypes.number.isRequired,
  daerah: PropTypes.string.isRequired,
  alamat: PropTypes.string.isRequired,
  deskripsi: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default CardDetail;
