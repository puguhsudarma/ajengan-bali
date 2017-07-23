import React, { Component } from 'react';
import {
  Image
} from 'react-native';
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
  Card,
  CardItem,
  Spinner,
} from 'native-base';
import {
  TitleCard
} from '../components';
import { NavigationActions } from 'react-navigation';
import { logout } from '../firebase/auth';
//images
import profileImage from '../images/avatar5.png';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: 'Profil',
        subtitle: 'AJEGLI APP',
      },
      user: {
        gambar: profileImage,
        nama: 'I Wayan Puguh Sudarma',
        email: 'wayanpuguhsudarma@gmail.com',
        username: 'reroet',
        alamat: 'Jln. Pulau Saelus I No. 1',
        telepon: '+6285338106836',
      },
      loading: false,
    };
  }

  logoutAction = () => {
    const { dispatch } = this.props.navigation;
    this.setState({ loading: true });

    logout()
      .then(() => {
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'login' })
          ],
        }));
      })
      .catch(err => {
        this.setState({ loading: true });
        console.log(err);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { header, user, loading, } = this.state;
    const { subtitle, title } = header;
    let { nama, email, gambar, alamat, telepon, username, } = user;

    return (
      <Container>
        <Header style={{ backgroundColor: '#3498db' }}>
          <Left>
            <Button transparent onPress={() => navigate('DrawerOpen')}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
            <Subtitle style={styles.subtitleHeader}>{subtitle}</Subtitle>
          </Body>
          <Right />
        </Header>

        <Content>
          <View style={{ height: 200, backgroundColor: '#3498db', justifyContent: 'center', alignItems: 'center', }}>
            <Image source={gambar} style={{
              borderColor: '#fff',
              borderWidth: 2,
              borderRadius: 500,
              width: 80,
              height: 80,
              marginBottom: 20,
            }} />
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16, textAlign: 'center', }}>{nama}</Text>
            <Text style={{ color: '#fff', textAlign: 'center', }}>{email}</Text>
          </View>

          <Card style={styles.card}>
            <CardItem header>
              <Body>
                <TitleCard>Data Profil</TitleCard>
              </Body>
            </CardItem>
            <CardItem>
              <Icon active style={{ color: '#ccc' }} name="people" />
              <Text>{username}</Text>
            </CardItem>
            <CardItem>
              <Icon active style={{ color: '#ccc' }} name="pin" />
              <Text>{alamat}</Text>
            </CardItem>
            <CardItem>
              <Icon active style={{ color: '#ccc' }} name="call" />
              <Text>{telepon}</Text>
            </CardItem>
          </Card>

          <Card style={styles.card}>
            <CardItem header>
              <Body>
                <TitleCard>Pengaturan Profil</TitleCard>
              </Body>
            </CardItem>
            <CardItem>
              <Button danger iconLeft
                disabled={loading}
                onPress={() => this.logoutAction()}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                  (loading && <Spinner color='#fff' />) || (!loading && <Icon name='home' />) 
                }
                <Text>Logout</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container >
    );
  }
}

const styles = {
  subtitleHeader: {
    color: '#fff',
  },
  card: {
    marginLeft: 5,
    marginRight: 5,
  },
};
