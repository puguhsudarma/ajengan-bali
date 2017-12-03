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

const CardDetail = ({ data, maxRating }) => (
  <Card style={styles.card}>
    <CardItem>
      <Body>
        <TitleCard>{data.nama}</TitleCard>
      </Body>
    </CardItem>
    <CardItem cardBody>
      <Image style={styles.warungImage} resizeMode="center" source={{ uri: data.picture }} />
    </CardItem>
    <CardItem>
      <Icon active name="bus" style={styles.iconColor} />
      <Text>{`${data.km} Km`}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="pin" style={styles.iconColor} />
      <Text>{data.daerah}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="map" style={styles.iconColor} />
      <Text>{data.alamat}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="call" style={styles.iconColor} />
      <Text>{data.telepon}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="list" style={styles.iconColor} />
      <Text>{data.deskripsi}</Text>
    </CardItem>
    <CardItem>
      <Icon active name="star" style={styles.iconColor} />
      <StarRating
        disabled
        starSize={30}
        maxStars={maxRating}
        rating={data.totalRating}
        starColor={styles.colorStar}
      />
    </CardItem>
  </Card>
);

CardDetail.propTypes = {
  data: PropTypes.shape().isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default CardDetail;
