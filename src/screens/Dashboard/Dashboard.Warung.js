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
import Loader from '../../HOC/Loader.HOC';
import styles from './Dashboard.Style';

// Render Item
const RenderWarungItem = ({ item, maxRating, navigate }) => (
  <ListItem thumbnail onPress={() => navigate(item.navigate)}>
    <Left>
      <Thumbnail square size={80} source={{ uri: item.picture }} />
    </Left>
    <Body>
      <Text>{item.nama}</Text>
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

RenderWarungItem.propTypes = {
  item: PropTypes.shape().isRequired,
  maxRating: PropTypes.number.isRequired,
  navigate: PropTypes.func.isRequired,
};

// Flat List
const ListWarung = ({ loading, data, maxRating, navigate, refreshCallback }) => (
  <FlatList
    data={data}
    refreshing={loading}
    keyExtractor={item => item.id}
    onRefresh={refreshCallback}
    renderItem={
      ({ item }) => <RenderWarungItem item={item} maxRating={maxRating} navigate={navigate} />
    }
  />
);

ListWarung.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  maxRating: PropTypes.number,
  navigate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  refreshCallback: PropTypes.func.isRequired,
};
ListWarung.defaultProps = {
  maxRating: 5,
};

export default Loader('data')(ListWarung);
