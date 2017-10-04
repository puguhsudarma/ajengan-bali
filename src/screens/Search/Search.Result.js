import React from 'react';
import { FlatList } from 'react-native';
import {
  Card,
  CardItem,
  Body,
  ListItem,
  Left,
  Text,
  View,
  Icon,
  Thumbnail,
  Right,
  Button,
} from 'native-base';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import TitleCard from '../../components/TitleCard/TitleCard';
import styles from './Search.Style';

const RenderItem = ({ item, onPress, maxRating, jenisData }) =>
  (
    <ListItem thumbnail onPress={() => onPress(item)}>
      <Left>
        <Thumbnail square size={80} source={{ uri: item.picture }} />
      </Left>
      <Body>
        <Text>{item.nama}</Text>
        {
          jenisData === 'makanan' &&
          <Text note><Icon name="folder" style={styles.iconList} /> {`Kategori : ${item.kategori}`}</Text>
        }
        <Text note><Icon name="pin" style={styles.iconList} /> {item.daerah}</Text>
        <Text note><Icon name="bus" style={styles.iconList} /> {`Jarak : ${item.jarak} Km`}</Text>
        <View style={styles.starContainer}>
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
        <Button transparent onPress={() => onPress(item)}>
          <Text>View</Text>
        </Button>
      </Right>
    </ListItem>
  );

RenderItem.propTypes = {
  item: PropTypes.shape().isRequired,
  onPress: PropTypes.func.isRequired,
  maxRating: PropTypes.number.isRequired,
  jenisData: PropTypes.string.isRequired,
};

const Result = ({ isSearched, data, maxRating, onPress, jenisData }) => {
  if (isSearched) {
    return (
      <Card style={styles.cardContainer}>
        <CardItem header>
          <Body>
            <TitleCard>Hasil Pencarian</TitleCard>
          </Body>
        </CardItem>
        <FlatList
          style={styles.listResult}
          keyExtractor={item => item.key}
          data={data}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              onPress={onPress}
              jenisData={jenisData}
              maxRating={maxRating}
            />
          )}
        />
      </Card>
    );
  }
  return null;
};

Result.propTypes = {
  isSearched: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf().isRequired,
  onPress: PropTypes.func.isRequired,
  jenisData: PropTypes.string.isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default Result;
