import React, { Component } from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Subtitle,
  Left,
  Right,
  Icon,
  Text,
  View,
  Button,
  Tabs,
  Tab,
  TabHeading,

  List,
  ListItem,
  Thumbnail,
} from 'native-base';
import StarRating from 'react-native-star-rating';

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
      titleHeader: 'Dashboard',
      subtitleHeader: 'Ajegli App',
      maxRating: 5,
      dataWarung: [
        {
          nama: 'Warung Bu Candra',
          daerah: 'Denpasar Utara',
          range: 0.3,
          rating: 3.4,
          gambar: profileImage,
        },
        {
          nama: 'Warung Nasi Singaraja',
          daerah: 'Denpasar Selatan',
          range: 1.2,
          rating: 4.5,
          gambar: button1,
        },
        {
          nama: 'Warung Babi Guling',
          daerah: 'Denpasar Utara',
          range: 2.5,
          rating: 3.7,
          gambar: button2,
        },
        {
          nama: 'Warung Sate Babi',
          daerah: 'Badung Sangeh',
          range: 10.1,
          rating: 3.5,
          gambar: button3,
        },
        {
          nama: 'Warung Sate Sapi',
          daerah: 'Badung Sangeh',
          range: 6.5,
          rating: 4.4,
          gambar: button4,
        },
        {
          nama: 'Warung Sate Celeng',
          daerah: 'Badung Sangeh',
          range: 0.2,
          rating: 4.8,
          gambar: profileImage,
        },
        {
          nama: 'Warung Babi Guling',
          daerah: 'Denpasar Utara',
          range: 0.1,
          rating: 4.9,
          gambar: button2,
        },
        {
          nama: 'Warung Sate Sapi',
          daerah: 'Badung Sangeh',
          range: 2.1,
          rating: 5.0,
          gambar: button4,
        },
        {
          nama: 'Warung Sate Celeng',
          daerah: 'Badung Sangeh',
          range: 1.5,
          rating: 3.9,
          gambar: profileImage,
        },
      ],
      dataMakanan: [
        {
          nama: 'Be Guling',
          daerah: 'Denpasar Utara',
          range: 0.3,
          rating: 3.4,
          gambar: profileImage,
        },
        {
          nama: 'Sobi',
          daerah: 'Denpasar Selatan',
          range: 1.2,
          rating: 4.5,
          gambar: button1,
        },
        {
          nama: 'Sate Babi',
          daerah: 'Denpasar Utara',
          range: 2.5,
          rating: 3.7,
          gambar: button2,
        },
        {
          nama: 'Lawar',
          daerah: 'Badung Sangeh',
          range: 10.1,
          rating: 3.5,
          gambar: button3,
        },
        {
          nama: 'Nasi Campur Lawar',
          daerah: 'Badung Sangeh',
          range: 6.5,
          rating: 4.4,
          gambar: button4,
        },
        {
          nama: 'Lawar',
          daerah: 'Badung Sangeh',
          range: 0.2,
          rating: 4.8,
          gambar: profileImage,
        },
        {
          nama: 'Sate Celeng',
          daerah: 'Denpasar Utara',
          range: 0.1,
          rating: 4.9,
          gambar: button2,
        },
        {
          nama: 'Lawar',
          daerah: 'Badung Sangeh',
          range: 2.1,
          rating: 5.0,
          gambar: button4,
        },
        {
          nama: 'Lawar',
          daerah: 'Badung Sangeh',
          range: 1.5,
          rating: 3.9,
          gambar: profileImage,
        },
      ],
    };
  }

  warung = () => {
    const { navigate } = this.props.navigation;
    const data = [...this.state.dataWarung];
    return (
      <List dataArray={data} renderRow={item =>
        <ListItem thumbnail onPress={() => navigate('detailWarung')}>
          <Left>
            <Thumbnail square size={80} source={item.gambar} />
          </Left>
          <Body>
            <Text>{item.nama}</Text>
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
            <Button transparent onPress={() => navigate('detailWarung')}>
              <Text>View</Text>
            </Button>
          </Right>
        </ListItem>
      } />
    );
  }

  makanan = () => {
    const data = [...this.state.dataMakanan];
    const { navigate } = this.props.navigation;
    return (
      <List dataArray={data} renderRow={item =>
        <ListItem thumbnail onPress={() => navigate('detailMakanan', { fromWarungPage: false, })}>
          <Left>
            <Thumbnail square size={80} source={item.gambar} />
          </Left>
          <Body>
            <Text>{item.nama}</Text>
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
            <Button transparent onPress={() => navigate('detailMakanan', { fromWarungPage: false, })}>
              <Text>View</Text>
            </Button>
          </Right>
        </ListItem>
      } />
    );
  }

  render() {
    const { titleHeader, subtitleHeader } = this.state;
    return (
      <Container>
        <Header hasTabs={true}>
          <Left>
            <Button transparent onPress={() => { }}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{titleHeader}</Title>
            <Subtitle style={styles.subtitle}>{subtitleHeader.toUpperCase()}</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={() => { }}>
              <Icon name='refresh' />
            </Button>
            <Button transparent onPress={() => { }}>
              <Icon name='search' />
            </Button>
          </Right>
        </Header>

        <Tabs>
          <Tab heading={<TabHeading><Icon name="albums" /><Text>Warung</Text></TabHeading>}>
            {this.warung()}
          </Tab>
          <Tab heading={<TabHeading><Icon name="restaurant" /><Text>Makanan</Text></TabHeading>}>
            {this.makanan()}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = {
  subtitle: {
    color: '#fff',
  },
};
