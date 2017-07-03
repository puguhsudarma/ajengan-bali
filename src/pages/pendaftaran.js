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
  Form,
  Item,
  Input,
  Button,
  View,
  Spinner,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { createUser, loginWithEmailPassword, } from '../firebase/auth';

export default class Pendaftaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleHeader: 'Pendaftaran',
      subtitleHeader: 'Ajegli',
      loading: false,
      msg: '',

      nama: '',
      username: '',
      password: '',
      email: '',
      alamat: '',
      telp: '',
    };
  }

  submit = async () => {
    this.setState({ loading: true });
    const { dispatch } = this.props.navigation;
    const { nama, username, password, email, alamat, telp, } = this.state;

    // validate input
    if (
      nama === '' ||
      username === '' ||
      password === '' ||
      email === '' ||
      alamat === '' ||
      telp === ''
    ) {
      this.setState({
        msg: 'Semua form input tidak boleh kosong!',
        loading: false,
      });
      return;
    }

    if (password.length < 6) {
      this.setState({
        msg: 'Password harus lebih dari 6 karakter!',
        loading: false,
      });
      return;
    }

    // create user
    try {
      const creating = await createUser({ alamat, email, nama, password, telp, username });
      const login = await creating && loginWithEmailPassword(email, password);
      creating && login &&
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Authorized' })],
        }));
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ msg: err, loading: false, });
      console.log(err);
    }
  }

  render() {
    const { titleHeader, subtitleHeader, loading, msg, } = this.state;
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{titleHeader}</Title>
            <Subtitle style={styles.subtitle}>{subtitleHeader.toUpperCase()}</Subtitle>
          </Body>
          <Right />
        </Header>

        <View style={styles.content}>
          <Content>
            <Text style={{ textAlign: 'center', color: 'red', marginTop: 20, }}>{msg}</Text>
            <Form style={styles.form}>
              <Item disabled={loading} regular style={styles.textInputTop}>
                <Icon active name='people' />
                <Input
                  disabled={loading}
                  placeholder="Nama Lengkap"
                  returnKeyType="next"
                  onChangeText={nama => this.setState({ nama })}
                />
              </Item>
              <Item disabled={loading} regular style={styles.textInput}>
                <Icon active name='outlet' />
                <Input
                  disabled={loading}
                  placeholder="Username"
                  returnKeyType="next"
                  onChangeText={username => this.setState({ username })}
                />
              </Item>
              <Item disabled={loading} regular style={styles.textInput}>
                <Icon active name='key' />
                <Input
                  disabled={loading}
                  placeholder="Password"
                  secureTextEntry
                  returnKeyType="next"
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
              <Item disabled={loading} regular style={styles.textInput}>
                <Icon active name='mail' />
                <Input
                  disabled={loading}
                  placeholder="Email"
                  returnKeyType="next"
                  keyboardType="email-address"
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item disabled={loading} regular style={styles.textInput}>
                <Icon active name='home' />
                <Input
                  disabled={loading}
                  placeholder="Alamat"
                  returnKeyType="next"
                  onChangeText={alamat => this.setState({ alamat })}
                />
              </Item>
              <Item disabled={loading} regular style={styles.textInputBottom}>
                <Icon active name='call' />
                <Input
                  disabled={loading}
                  placeholder="No. Telepon"
                  keyboardType="phone-pad"
                  returnKeyType="go"
                  onChangeText={telp => this.setState({ telp })}
                />
              </Item>

              <Button disabled={loading} iconLeft block rounded style={styles.button} onPress={() => this.submit()}>
                {
                  (loading && <Spinner color='#fff' />) || (!loading && <Icon active name='list-box' />)
                }
                <Text>Daftar</Text>
              </Button>
            </Form>
          </Content>
        </View>
      </Container>
    );
  }
}

const styles = {
  content: {
    backgroundColor: '#3498db',
    flex: 1,
  },
  header: {
    backgroundColor: '#3498db',
  },
  subtitle: {
    color: '#fff'
  },
  form: {
    margin: 20
  },
  button: {
    marginTop: 20
  },
  textInput: {
    backgroundColor: '#fff',
    marginTop: 5,
  },
  textInputTop: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textInputBottom: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 5,
  },
}
