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

const RenderItem = ({ item, maxRating }) => (
  <ListItem>
    <Body>
      <Text style={styles.cardReviewNama}>{item.nama}</Text>
      <View style={styles.cardReviewStarContainer}>
        <StarRating
          disabled
          starSize={15}
          maxStars={maxRating}
          rating={item.rating}
          starColor={styles.colorStar}
        />
      </View>
      <Text note>{item.review}</Text>
    </Body>
  </ListItem>
);

RenderItem.propTypes = {
  item: PropTypes.shape().isRequired,
  maxRating: PropTypes.number.isRequired,
};

const CardReview = ({ data, maxRating }) => (
  <Card style={styles.card}>
    <CardItem header>
      <TitleCard>Review Warung</TitleCard>
    </CardItem>
    <FlatList
      data={data}
      keyExtractor={item => item.key}
      renderItem={({ item }) => (<RenderItem item={item} maxRating={maxRating} />)}
    />
  </Card>
);

CardReview.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default CardReview;
