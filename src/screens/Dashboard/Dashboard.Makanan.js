import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import {
  Body,
  Left,
  Right,
  Icon,
  Text,
  View,
  Button,
  ListItem,
  Thumbnail,
} from 'native-base';
import StarRating from 'react-native-star-rating';
import styles from './Dashboard.Style';

const renderMakananItem = (item, maxRating) => (
  <ListItem key={item.id} thumbnail onPress={item.navigate}>
    <Left>
      <Thumbnail square size={80} source={item.gambar} />
    </Left>
    <Body>
      <Text>{item.nama}</Text>
      <Text note><Icon name="folder" style={styles.fontIcon} />Kategori : {item.kategori}</Text>
      <Text note><Icon name="pin" style={styles.fontIcon} /> {item.daerah}</Text>
      <Text note><Icon name="bus" style={styles.fontIcon} /> Jarak : {item.range} Km</Text>
      <View style={styles.viewRating}>
        <StarRating
          starSize={15}
          maxStars={maxRating}
          rating={item.rating}
          starColor={styles.ratingColor}
          disabled
        />
      </View>
    </Body>
    <Right>
      <Button transparent onPress={item.navigate}>
        <Text>View</Text>
      </Button>
    </Right>
  </ListItem>
);

const ListMakanan = ({ data, maxRating }) => (
  <FlatList
    data={data}
    keyExtractor={item => item.id}
    renderItem={({ item }) => renderMakananItem(item, maxRating)}
  />
);

const { shape, number, arrayOf, any, string, func } = PropTypes;
ListMakanan.propTypes = {
  data: arrayOf(shape({
    id: number,
    gambar: any,
    nama: string,
    kategori: string,
    daerah: string,
    range: number,
    rating: number,
    navigate: func,
  })).isRequired,
  maxRating: number,
};
ListMakanan.defaultProps = {
  maxRating: 5,
};

export default ListMakanan;
