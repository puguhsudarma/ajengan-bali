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

const RenderItem = ({
  navigate,
  path,
  gambar,
  nama,
  daerah,
  range,
  maxRating,
  rating,
  kategori,
  jenis }) => (
    <ListItem thumbnail onPress={navigate(path)}>
      <Left>
        <Thumbnail square size={80} source={{ uri: gambar }} />
      </Left>
      <Body>
        <Text>{nama}</Text>
        {
          jenis !== 'warung' &&
          <Text note><Icon name="folder" style={styles.iconList} /> {`Kategori : ${kategori}`}</Text>
        }
        <Text note><Icon name="pin" style={styles.iconList} /> {daerah}</Text>
        <Text note><Icon name="bus" style={styles.iconList} /> {`Jarak : ${range} Km`}</Text>
        <View style={styles.starContainer}>
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
        <Button transparent onPress={navigate(path)}>
          <Text>View</Text>
        </Button>
      </Right>
    </ListItem>
  );

RenderItem.propTypes = {
  navigate: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  gambar: PropTypes.string.isRequired,
  nama: PropTypes.string.isRequired,
  daerah: PropTypes.string.isRequired,
  range: PropTypes.number.isRequired,
  maxRating: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  kategori: PropTypes.string,
  jenis: PropTypes.string.isRequired,
};

RenderItem.defaultProps = {
  kategori: null,
};

const Result = ({ isSearched, data, navigate, maxRating }) => {
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
          keyExtractor={item => item.id}
          data={data}
          renderItem={item => <RenderItem {...item} navigate={navigate} maxRating={maxRating} />}
        />
      </Card>
    );
  }
  return null;
};

Result.propTypes = {
  isSearched: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf().isRequired,
  navigate: PropTypes.func.isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default Result;
