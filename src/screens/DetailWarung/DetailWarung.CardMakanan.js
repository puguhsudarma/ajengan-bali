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

const RenderItem = ({ nama, gambar, rating, onPressNav, maxRating }) => (
  <ListItem thumbnail onPress={onPressNav}>
    <Left>
      <Thumbnail square size={80} source={gambar} />
    </Left>
    <Body>
      <Text>{nama}</Text>
      <View style={styles.StarContainer}>
        <StarRating
          disabled
          starSize={15}
          maxStars={maxRating}
          rating={rating}
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
  nama: PropTypes.string.isRequired,
  gambar: PropTypes.oneOfType([PropTypes.number]).isRequired,
  rating: PropTypes.number.isRequired,
  onPressNav: PropTypes.func.isRequired,
  maxRating: PropTypes.number.isRequired,
};

const CardMakanan = ({ data, navigate, maxRating }) => (
  <Card style={styles.card}>
    <CardItem header>
      <TitleCard>Daftar Menu Makanan</TitleCard>
    </CardItem>
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => (
        <RenderItem
          {...item}
          maxRating={maxRating}
          onPressNav={() => navigate('makanan')}
        />
      )}
    />
  </Card>
);

CardMakanan.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  navigate: PropTypes.func.isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default CardMakanan;
