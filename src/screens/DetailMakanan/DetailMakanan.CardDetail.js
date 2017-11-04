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

const CardDetail = ({ item, maxRating }) => (
  <Card style={styles.card}>
    <CardItem>
      <Body>
        <TitleCard>{item.nama}</TitleCard>
      </Body>
    </CardItem>
    <CardItem cardBody>
      <Image
        style={styles.makananImage}
        resizeMode="center"
        source={{ uri: item.picture }}
      />
    </CardItem>
    <CardItem>
      <Icon active name="md-browsers" style={styles.iconColor} />
      <Text>{item.kategori}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="md-cash" style={styles.iconColor} />
      <Text>{`Rp. ${numberWithCommas(item.harga)}`}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="list" style={styles.iconColor} />
      <Text>{item.deskripsi}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="md-star" style={styles.iconColor} />
      <StarRating
        starSize={30}
        disabled
        maxStars={maxRating}
        rating={item.totalRating}
        starColor={styles.colorStar}
      />
    </CardItem>
  </Card>
);

CardDetail.propTypes = {
  item: PropTypes.shape().isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default CardDetail;
