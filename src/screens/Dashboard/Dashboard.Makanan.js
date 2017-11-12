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
import Loader from '../../HOC/Loader/Loader';

// Makanan Item
const RenderMakananItem = ({ item, maxRating, onPress }) => (
  <ListItem key={item.id} thumbnail onPress={onPress}>
    <Left>
      <Thumbnail square size={80} source={{ uri: item.picture }} />
    </Left>
    <Body>
      <Text>{item.nama}</Text>
      <Text note><Icon name="home" style={styles.fontIcon} />{item.warung.nama}</Text>
      <Text note><Icon name="folder" style={styles.fontIcon} />Kategori : {item.kategori}</Text>
      <Text note><Icon name="pin" style={styles.fontIcon} /> {item.warung.daerah}</Text>
      <Text note><Icon name="bus" style={styles.fontIcon} /> Jarak : {item.km} Km</Text>
      <View style={styles.viewRating}>
        <StarRating
          starSize={15}
          maxStars={maxRating}
          rating={item.totalRating}
          starColor={styles.ratingColor}
          disabled
        />
      </View>
    </Body>
    <Right>
      <Button transparent onPress={onPress}>
        <Text>View</Text>
      </Button>
    </Right>
  </ListItem>
);

RenderMakananItem.propTypes = {
  item: PropTypes.shape().isRequired,
  maxRating: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

// Flat List
const ListMakanan = ({ data, maxRating, loading, refreshCallback, selected }) => (
  <FlatList
    data={data}
    refreshing={loading}
    onRefresh={refreshCallback}
    keyExtractor={item => item.key}
    renderItem={
      ({ item }) => (<RenderMakananItem
        item={item}
        maxRating={maxRating}
        onPress={() => selected(item)}
      />)
    }
  />
);

ListMakanan.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  maxRating: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  refreshCallback: PropTypes.func.isRequired,
  selected: PropTypes.func.isRequired,
};

export default Loader('data')(ListMakanan);
