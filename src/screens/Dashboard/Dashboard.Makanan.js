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
import Loader from '../../HOC/Loader.HOC';

// Makanan Item
const RenderMakananItem = ({ item, maxRating, navigate }) => (
  <ListItem key={item.id} thumbnail onPress={() => navigate(item.navigate)}>
    <Left>
      <Thumbnail square size={80} source={{ uri: item.picture }} />
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
      <Button transparent onPress={() => navigate(item.navigate)}>
        <Text>View</Text>
      </Button>
    </Right>
  </ListItem>
);

RenderMakananItem.propTypes = {
  item: PropTypes.shape().isRequired,
  maxRating: PropTypes.number.isRequired,
  navigate: PropTypes.func.isRequired,
};

// Flat List
const ListMakanan = ({ data, maxRating, navigate, loading, refreshCallback }) => (
  <FlatList
    data={data}
    refreshing={loading}
    onRefresh={refreshCallback}
    keyExtractor={item => item.id}
    renderItem={
      ({ item }) => <RenderMakananItem item={item} maxRating={maxRating} navigate={navigate} />
    }
  />
);

ListMakanan.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  navigate: PropTypes.func.isRequired,
  maxRating: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  refreshCallback: PropTypes.func.isRequired,
};
ListMakanan.defaultProps = {
  maxRating: 5,
};

export default Loader('data')(ListMakanan);
