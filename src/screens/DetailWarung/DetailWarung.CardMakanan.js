import React from 'react';
import { FlatList } from 'react-native';
import {
  ListItem,
  Left,
  Right,
  Thumbnail,
  Body,
  Text,
  View,
  Button,
  Card,
  CardItem,
} from 'native-base';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import styles from './DetailWarung.Style';
import TitleCard from '../../components/TitleCard/TitleCard';

const RenderItem = ({ item, onPressNav, maxRating }) => (
  <ListItem thumbnail onPress={onPressNav}>
    <Left>
      <Thumbnail square size={80} source={{ uri: item.picture }} />
    </Left>
    <Body>
      <Text>{item.nama}</Text>
      <View style={styles.StarContainer}>
        <StarRating
          disabled
          starSize={15}
          maxStars={maxRating}
          rating={item.totalRating}
          starColor={styles.colorStar}
        />
      </View>
    </Body>
    <Right>
      <Button transparent onPress={onPressNav}>
        <Text>View</Text>
      </Button>
    </Right>
  </ListItem>
);

RenderItem.propTypes = {
  item: PropTypes.shape().isRequired,
  onPressNav: PropTypes.func.isRequired,
  maxRating: PropTypes.number.isRequired,
};

const CardMakanan = ({ data, maxRating, selectedData }) => (
  <Card style={styles.card}>
    <CardItem header>
      <TitleCard>Daftar Menu Makanan</TitleCard>
    </CardItem>
    <FlatList
      data={data}
      keyExtractor={item => item.key}
      renderItem={
        ({ item }) => (<RenderItem
          item={item}
          maxRating={maxRating}
          onPressNav={() => selectedData(item)}
        />)
      }
    />
  </Card>
);

CardMakanan.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  maxRating: PropTypes.number.isRequired,
  selectedData: PropTypes.func.isRequired,
};

export default CardMakanan;
