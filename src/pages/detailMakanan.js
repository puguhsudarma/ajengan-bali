import React, { Component } from 'react';
import {
  Container,
  Header,
  Body,
  Content,
  Title,
  Subtitle,
  Left,
  Right,
  Icon,
  Text,
  View,
  Button,
  List,
  ListItem,
  Card,
  CardItem,
  Input,
  Item,
} from 'native-base';
import StarRating from 'react-native-star-rating';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal';
import getDirections from 'react-native-google-maps-directions';
import {
  TitleCard,
  Alert,
  GeoLocation,
} from '../components';

export default class DetailMakanan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: 'Detail Makanan',
        subtitle: 'Ajegli App',
      },
      maxRating: 5,
      detailMakanan: {
        nama: 'Nasi Be Guling',
        kategori: 'Masakan Babi Guling',
        harga: 17000,
        deskripsi: 'Berisikan nasi, babi guling, lawar, dan sate be guling.',
        rating: 3.4,
        gambar: { uri: 'https://cdn.water-sport-bali.com/wp-content/uploads/2012/11/menu-ibu-oka-ubud.jpg' },
      },
      detailWarung: {
        nama: 'Warung Bu Candra',
        daerah: 'Denpasar Utara',
        range: 0.3,
        alamat: 'Jln. Gatsu Barat, Sebelah Hotel Tulip',
      },
      review: [
        {
          nama: 'Gung Wah',
          rating: 3.4,
          komentar: 'Manstap',
        },
        {
          nama: 'Purnama Dewi',
          rating: 4.8,
          komentar: 'Manstap',
        },
        {
          nama: 'Gus Win',
          rating: 2.3,
          komentar: '',
        },
        {
          nama: 'Ayu Dwijayanti',
          rating: 3,
          komentar: 'Ya mantap aja, cuma ada yang kurang',
        },
        {
          nama: 'Nusandika',
          rating: 5,
          komentar: 'Ayam betutu disini paling recommended',
        },
      ],

      modalVisible: false,
      reviewInput: {
        star: 0,
        desc: '',
      },
      modalInputTemp: {
        star: 0,
        desc: '',
      },
      coordSuccess: false,
      myCoord: null,
    };
  }

  componentDidMount() {
    GeoLocation((position) => {
      this.setState({ myCoord: position.coords, coordSuccess: true });
    });
  }

  handleGetDirections = () => {
    if (!this.state.coordSuccess) return Alert('Geolocation tidak ditemukan.');
    const { latitude, longitude } = this.state.myCoord;
    getDirections({
      source: {
        latitude,
        longitude,
      },
      destination: {
        latitude: -8.648222,
        longitude: 115.225591,
      },
    });
  }

  review = () => {
    const data = [...this.state.review];
    return (
      <List dataArray={data} renderRow={item =>
        <ListItem>
          <Body>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.nama}</Text>
            <View style={{ width: 100, marginTop: 5, marginLeft: 10, }}>
              <StarRating
                starSize={15}
                disabled={true}
                maxStars={this.state.maxRating}
                rating={item.rating}
                starColor={'#FFDF00'}
              />
            </View>
            <Text note>{item.komentar}</Text>
          </Body>
        </ListItem>
      } />
    );
  }

  numberWithCommas = (x) => {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join('.');
  }
  
  // modal function
  onStarRatingPress = (rating) => {
    this.setState(prevState => ({
      modalInputTemp: {
        ...prevState.modalInputTemp,
        star: rating,
      }
    }));
  }

  onReviewInput = (text) => {
    this.setState(prevState => ({
      modalInputTemp: {
        ...prevState.modalInputTemp,
        desc: text,
      }
    }));
  }

  onModalOk = () => {
    this.setState(prevState => ({
      reviewInput: {
        ...prevState.modalInputTemp,
      },
      modalVisible: !prevState.modalVisible,
    }));
  }

  onModalCancel = () => {
    this.setState(prevState => ({
      modalInputTemp: {
        ...prevState.reviewInput,
      },
      modalVisible: !prevState.modalVisible,
    }));
  }

  render() {
    const { header, modalVisible, maxRating, modalInputTemp, detailMakanan, detailWarung } = this.state;
    const { nama, deskripsi, gambar, rating, harga, kategori } = detailMakanan;
    const { nama: namaWarung, alamat, daerah, range } = detailWarung;
    const { fromWarungPage } = this.props.navigation.state.params;
    const { goBack, navigate } = this.props.navigation;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{header.title}</Title>
            <Subtitle style={styles.subtitle}>{header.subtitle.toUpperCase()}</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={() => { }}>
              <Icon name='refresh' />
            </Button>
          </Right>
        </Header>

        <Content>
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <TitleCard>{nama}</TitleCard>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Image
                style={{ height: 200, flex: 1, flexDirection: 'column', marginLeft: 10, marginRight: 10, marginBottom: 10 }}
                resizeMode='center'
                source={gambar}
              />
            </CardItem>
            <CardItem>
              <Icon active style={{ color: 'brown' }} name="md-browsers" />
              <Text>{kategori}</Text>
            </CardItem>
            <CardItem>
              <Icon active style={{ color: 'green' }} name="md-cash" />
              <Text>{'Rp. '}{this.numberWithCommas(harga)}</Text>
            </CardItem>
            <CardItem>
              <Icon active style={{ color: 'red' }} name="list" />
              <Text>{deskripsi}</Text>
            </CardItem>
            <CardItem>
              <Icon active style={{ color: 'brown' }} name="md-star" />
              <StarRating
                starSize={30}
                disabled={true}
                maxStars={maxRating}
                rating={rating}
                starColor={'#FFDF00'}
              />
            </CardItem>
          </Card>

          <Card style={styles.card}>
            <CardItem>
              <Body>
                <TitleCard>Informasi Warung</TitleCard>
              </Body>
            </CardItem>
            <CardItem>
              <Icon active style={{ color: 'green' }} name="home" />
              <Text>{namaWarung}</Text>
            </CardItem>
            <CardItem>
              <Icon active style={{ color: 'brown' }} name="bus" />
              <Text>{range}{' Km'}</Text>
            </CardItem>
            <CardItem>
              <Icon active style={{ color: 'blue' }} name="pin" />
              <Text>{daerah}</Text>
            </CardItem>
            <CardItem>
              <Icon active style={{ color: 'green' }} name="md-map" />
              <Text>{alamat}</Text>
            </CardItem>
            {
              !fromWarungPage &&
              <CardItem>
                <Icon active style={{ color: 'green' }} name="md-book" />
                <Button rounded onPress={() => navigate('detailWarung')}>
                  <Text>Halaman Warung</Text>
                </Button>
              </CardItem>
            }
          </Card>

          <Card style={styles.card}>
            <CardItem header>
              <TitleCard>Review Makanan</TitleCard>
            </CardItem>
            {this.review()}
          </Card>
        </Content>

        <ActionButton buttonColor='rgba(231,76,60,1)'>

          <ActionButton.Item buttonColor='#9b59b6' title='Navigasi Peta' onPress={() => this.handleGetDirections()}>
            <Icon name='md-map' style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='#3498db' title='Beri Review' onPress={() => this.setState({ modalVisible: !modalVisible })}>
            <Icon name='md-star' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

        <Modal isVisible={modalVisible}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.modal}>
              <TitleCard style={{ marginBottom: 20, }}>Input Review</TitleCard>

              <StarRating
                disabled={false}
                maxStars={maxRating}
                rating={modalInputTemp.star}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                starColor={'#FFDF00'}
              />

              <View style={{ marginTop: 20, }}>
                <Item>
                  <Input placeholder="Review" value={modalInputTemp.desc} onChange={event => this.onReviewInput(event.nativeEvent.text)} />
                </Item>
              </View>
              <View style={{ alignSelf: 'flex-end', flexDirection: 'row', }}>
                <TouchableOpacity style={{ marginTop: 20, marginLeft: 20, }} onPress={() => this.onModalCancel()}>
                  <Text style={{ color: 'brown' }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 20, marginLeft: 20, }} onPress={() => this.onModalOk()}>
                  <Text style={{ color: 'brown' }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

const styles = {
  subtitle: {
    color: '#fff',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
  },
  modal: {
    padding: 20,
    margin: 5,
    backgroundColor: '#fff',
    flexGrow: 1,
  }
};
