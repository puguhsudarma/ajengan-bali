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
import styles from './DetailMakanan.Style';
import { numberWithCommas } from '../../libs/helper';

const CardDetail = ({ nama, gambar, kategori, harga, deskripsi, rating, maxRating }) => (
  <Card style={styles.card}>
    <CardItem>
      <Body>
        <TitleCard>{nama}</TitleCard>
      </Body>
    </CardItem>
    <CardItem cardBody>
      <Image style={styles.makananImage} resizeMode="center" source={{ uri: gambar }} />
    </CardItem>
    <CardItem>
      <Icon active name="md-browsers" />
      <Text>{kategori}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="md-cash" />
      <Text>{`Rp. ${numberWithCommas(harga)}`}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="list" />
      <Text>{deskripsi}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="md-star" />
      <StarRating
        starSize={30}
        disabled
        maxStars={maxRating}
        rating={rating}
        starColor={styles.colorStar}
      />
    </CardItem>
  </Card>
);

CardDetail.propTypes = {
  nama: PropTypes.string.isRequired,
  gambar: PropTypes.oneOfType([PropTypes.number]).isRequired,
  kategori: PropTypes.string.isRequired,
  harga: PropTypes.number.isRequired,
  deskripsi: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default CardDetail;
