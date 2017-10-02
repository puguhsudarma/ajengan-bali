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

const RenderReview = ({ item, maxRating }) => (
  <ListItem>
    <Body>
      <Text style={styles.reviewTextNama}>{item.nama}</Text>
      <View style={styles.reviewStarContainer}>
        <StarRating
          starSize={15}
          disabled
          maxStars={maxRating}
          rating={item.rating}
          starColor={styles.colorStar}
        />
      </View>
      <Text note>{item.review}</Text>
    </Body>
  </ListItem>
);

RenderReview.propTypes = {
  item: PropTypes.shape().isRequired,
  maxRating: PropTypes.number.isRequired,
};

const CardReview = ({ data, maxRating }) => (
  <Card style={styles.card}>
    <CardItem header>
      <TitleCard>Review Makanan</TitleCard>
    </CardItem>

    <FlatList
      data={data}
      keyExtractor={item => item.key}
      renderItem={({ item }) => <RenderReview item={item} maxRating={maxRating} />}
    />
  </Card >
);

CardReview.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default CardReview;
