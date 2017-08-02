import React from 'react';
import { FlatList } from 'react-native';
import {
  ListItem,
  Body,
  Text,
  View,
  Card,
  CardItem,
} from 'native-base';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import TitleCard from '../../components/TitleCard/TitleCard';
import styles from './DetailWarung.Style';

const RenderItem = ({ nama, rating, komentar, maxRating }) => (
  <ListItem>
    <Body>
      <Text style={styles.cardReviewNama}>{nama}</Text>
      <View style={styles.cardReviewStarContainer}>
        <StarRating
          disabled
          starSize={15}
          maxStars={maxRating}
          rating={rating}
          starColor={styles.colorStar}
        />
      </View>
      <Text note>{komentar}</Text>
    </Body>
  </ListItem>
);

RenderItem.propTypes = {
  nama: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  komentar: PropTypes.string.isRequired,
  maxRating: PropTypes.number.isRequired,
};

const CardReview = ({ data, maxRating }) => (
  <Card style={styles.card}>
    <CardItem header>
      <TitleCard>Review Warung</TitleCard>
    </CardItem>
    <FlatList
      dataArray={data}
      renderRow={item => <RenderItem {...item} maxRating={maxRating} />}
    />
  </Card>
);

CardReview.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default CardReview;
