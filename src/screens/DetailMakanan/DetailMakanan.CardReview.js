import React from 'react';
import { FlatList } from 'react-native';
import {
  Card,
  CardItem,
  ListItem,
  Body,
  Text,
  View,
} from 'native-base';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import styles from './DetailMakanan.Style';
import TitleCard from '../../components/TitleCard/TitleCard';

const RenderReview = ({ nama, rating, komentar, maxRating }) => (
  <ListItem>
    <Body>
      <Text style={styles.reviewTextNama}>{nama}</Text>
      <View style={styles.reviewStarContainer}>
        <StarRating
          starSize={15}
          disabled
          maxStars={maxRating}
          rating={rating}
          starColor={styles.colorStar}
        />
      </View>
      <Text note>{komentar}</Text>
    </Body>
  </ListItem>
);

RenderReview.propTypes = {
  nama: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  komentar: PropTypes.string.isRequired,
  maxRating: PropTypes.number.isRequired,
};

const CardReview = ({ data, maxRating }) => (
  <Card style={styles.card}>
    <CardItem header>
      <TitleCard>Review Makanan</TitleCard>
    </CardItem>

    <FlatList
      data={data}
      keyExtractor={data.id}
      renderItem={item => <RenderReview {...item} maxRating={maxRating} />}
    />
  </Card >
);

CardReview.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default CardReview;
