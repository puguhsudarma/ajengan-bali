import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Body,
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
  Thumbnail,
  Card,
  CardItem,
  Input,
  Item,
  Picker,
} from 'native-base';
import StarRating from 'react-native-star-rating';
import { TitleCard } from '../components';

//images
import profileImage from '../images/avatar5.png';
import button1 from '../images/1.png';
import button2 from '../images/2.png';
import button3 from '../images/3.png';
import button4 from '../images/4.png';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: 'Search',
        subtitle: 'AJEGLI APP',
      },
      query: null,
      jenis: null,
      cat: null,
      clickedCari: false,
      maxRating: 5,
      jenisData: [
        {
          key: 1,
          val: 'Warung',
        },
        {
          key: 2,
          val: 'Makanan',
        }
      ],
      listCategory: [
        {
          key: 1,
          val: 'Babi Guling',
        },
        {
          key: 2,
          val: 'Lawar',
        },
        {
          key: 3,
          val: 'Jukut urap',
        },
        {
          key: 4,
          val: 'Lain - lain',
        },
      ],
      hasilQuery: [
        {
          jenis: 'warung',
          nama: 'Warung Bu Candra',
          daerah: 'Denpasar Utara',
          range: 0.3,
          rating: 3.4,
          gambar: profileImage,
        },
        {
          jenis: 'warung',
          nama: 'Warung Nasi Singaraja',
          daerah: 'Denpasar Selatan',
          range: 1.2,
          rating: 4.5,
          gambar: button1,
        },
        {
          jenis: 'warung',
          nama: 'Warung Sate Babi',
          daerah: 'Badung Sangeh',
          range: 10.1,
          rating: 3.5,
          gambar: button3,
        },
        {
          jenis: 'warung',
          nama: 'Warung Sate Sapi',
          daerah: 'Badung Sangeh',
          range: 6.5,
          rating: 4.4,
          gambar: button4,
        },
        {
          jenis: 'makanan',
          nama: 'Lawar',
          daerah: 'Badung Sangeh',
          range: 0.2,
          rating: 4.8,
          kategori: 'Lawar',
          gambar: profileImage,
        },
        {
          jenis: 'warung',
          nama: 'Warung Sate Celeng',
          daerah: 'Badung Sangeh',
          range: 0.2,
          rating: 4.8,
          gambar: profileImage,
        },
        {
          jenis: 'makanan',
          nama: 'Be Guling',
          daerah: 'Denpasar Utara',
          range: 0.3,
          rating: 3.4,
          kategori: 'Babi',
          gambar: profileImage,
        },
        {
          jenis: 'warung',
          nama: 'Warung Babi Guling',
          daerah: 'Denpasar Utara',
          range: 0.1,
          rating: 4.9,
          gambar: button2,
        },
        {
          jenis: 'warung',
          nama: 'Warung Sate Sapi',
          daerah: 'Badung Sangeh',
          range: 2.1,
          rating: 5.0,
          gambar: button4,
        },
        {
          jenis: 'warung',
          nama: 'Warung Sate Celeng',
          daerah: 'Badung Sangeh',
          range: 1.5,
          rating: 3.9,
          gambar: profileImage,
        },
        {
          jenis: 'makanan',
          nama: 'Sobi',
          daerah: 'Denpasar Selatan',
          range: 1.2,
          rating: 4.5,
          kategori: 'Babi',
          gambar: button1,
        },
        {
          jenis: 'makanan',
          nama: 'Sate Babi',
          daerah: 'Denpasar Utara',
          range: 2.5,
          rating: 3.7,
          kategori: 'Babi',
          gambar: button2,
        },
        {
          jenis: 'warung',
          nama: 'Warung Babi Guling',
          daerah: 'Denpasar Utara',
          range: 2.5,
          rating: 3.7,
          gambar: button2,
        },
        {
          jenis: 'makanan',
          nama: 'Lawar',
          daerah: 'Badung Sangeh',
          range: 10.1,
          rating: 3.5,
          kategori: 'Lawar',
          gambar: button3,
        },
        {
          jenis: 'makanan',
          nama: 'Nasi Campur Lawar',
          daerah: 'Badung Sangeh',
          range: 6.5,
          rating: 4.4,
          kategori: 'Lawar',
          gambar: button4,
        },
        {
          jenis: 'makanan',
          nama: 'Sate Celeng',
          daerah: 'Denpasar Utara',
          range: 0.1,
          rating: 4.9,
          kategori: 'Babi',
          gambar: button2,
        },
        {
          jenis: 'makanan',
          nama: 'Lawar',
          daerah: 'Badung Sangeh',
          range: 2.1,
          rating: 5.0,
          kategori: 'Lawar',
          gambar: button4,
        },
        {
          jenis: 'makanan',
          nama: 'Lawar',
          daerah: 'Badung Sangeh',
          range: 1.5,
          rating: 3.9,
          kategori: 'Lawar',
          gambar: profileImage,
        },
      ]
    };
  }

  result = () => {
    const { navigate } = this.props.navigation;
    const data = [...this.state.hasilQuery];
    return (
      <List style={{ backgroundColor: '#fff' }} dataArray={data} renderRow={item =>
        <ListItem thumbnail onPress={() => item.jenis == 'warung' ? navigate('detailWarung') : navigate('detailMakanan', { fromWarungPage: false, })}>
          <Left>
            <Thumbnail square size={80} source={item.gambar} />
          </Left>
          <Body>
            <Text>{item.nama}</Text>
            {
              item.jenis != 'warung' &&
              <Text note><Icon name="folder" style={{ fontSize: 14, color: 'gray' }} /> Kategori : {item.kategori}</Text>
            }
            <Text note><Icon name="pin" style={{ fontSize: 14, color: 'gray' }} /> {item.daerah}</Text>
            <Text note><Icon name="bus" style={{ fontSize: 14, color: 'gray' }} /> Jarak : {item.range} Km</Text>
            <View style={{ width: 100, marginTop: 5, }}>
              <StarRating
                starSize={15}
                disabled={true}
                maxStars={this.state.maxRating}
                rating={item.rating}
                starColor={'#FFDF00'}
              />
            </View>
          </Body>
          <Right>
            <Button transparent onPress={() => item.jenis == 'warung' ? navigate('detailWarung') : navigate('detailMakanan', { fromWarungPage: false, })}>
              <Text>View</Text>
            </Button>
          </Right>
        </ListItem>
      } />
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { header, listCategory, jenisData, cat, jenis, query, clickedCari, } = this.state;
    const { title, subtitle } = header;

    console.log(this.state);
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigate('DrawerOpen')}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
            <Subtitle style={styles.subtitle}>{subtitle.toUpperCase()}</Subtitle>
          </Body>
          <Right />
        </Header>

        <Content>
          <Card style={styles.cardContainer}>
            <CardItem header>
              <Body>
                <TitleCard>Pencarian</TitleCard>
              </Body>
            </CardItem>
            <View style={{ paddingHorizontal: 15, }}>
              <Item>
                <Icon active name='search' />
                <Input value={query} onChangeText={e => this.setState({ query: e })} placeholder='Mencari sesuatu ?' />
              </Item>
              <Picker
                supportedOrientations={['portrait', 'landscape']}
                mode="dropdown"
                selectedValue={jenis}
                onValueChange={(e) => this.setState({ jenis: e })}>
                <Item key={0} label={'- Pilih Jenis Data -'} value={0} />
                {jenisData.map(item => <Item key={item.key} label={item.val} value={item.key} />)}
              </Picker>
              {
                jenis == 2 &&
                <Picker
                  supportedOrientations={['portrait', 'landscape']}
                  mode="dropdown"
                  selectedValue={cat}
                  onValueChange={(e) => this.setState({ cat: e })}>
                  <Item key={0} label={'- Pilih Kategori Makanan -'} value={0} />
                  {listCategory.map(item => <Item key={item.key} label={item.val} value={item.key} />)}
                </Picker>
              }
            </View>
            <CardItem footer style={{ justifyContent: 'flex-end' }}>
              <Button success small iconLeft onPress={() => this.setState({ clickedCari: true })}>
                <Icon name="search" />
                <Text>
                  Cari
                </Text>
              </Button>
            </CardItem>
          </Card>

          {
            clickedCari &&
            <Card style={styles.cardContainer}>
              <CardItem header>
                <Body>
                  <TitleCard>Hasil Pencarian</TitleCard>
                </Body>
              </CardItem>
              {this.result()}
            </Card>
          }
        </Content>
      </Container>
    );
  }
}

const styles = {
  subtitle: {
    color: '#fff',
  },

  cardContainer: {
    marginLeft: 10,
    marginRight: 10,
  }
};
