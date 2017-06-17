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
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

export default class Pendaftaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleHeader: 'Pendaftaran',
      subtitleHeader: 'Ajegli App',
      
      namaLengkap: '',
      username: '',
      password: '',
      email: '',
      alamat: '',
      telepon: '',
    };
  }

  submit = () => {
    console.log(this.state);
  }

  render() {
    const { titleHeader, subtitleHeader } = this.state;
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
        <LinearGradient
          start={{ x: 0.1, y: 0.4 }} end={{ x: 0.7, y: 0.9 }}
          colors={['#4B79A1', '#283E51']}
          style={styles.content}>
          <Content>
            <Form style={styles.form}>
              <Item regular style={styles.textInputTop}>
                <Icon active name='people' />
                <Input
                  placeholder="Nama Lengkap"
                  returnKeyType="next"
                  onChange={e => this.setState({namaLengkap: e.nativeEvent.text})}
                />
              </Item>
              <Item regular style={styles.textInput}>
                <Icon active name='outlet' />
                <Input
                  placeholder="Username"
                  returnKeyType="next"
                  onChange={e => this.setState({username: e.nativeEvent.text})}
                />
              </Item>
              <Item regular style={styles.textInput}>
                <Icon active name='key' />
                <Input
                  placeholder="Password"
                  secureTextEntry
                  returnKeyType="next"
                  onChange={e => this.setState({password: e.nativeEvent.text})}
                />
              </Item>
              <Item regular style={styles.textInput}>
                <Icon active name='mail' />
                <Input
                  placeholder="Email"
                  returnKeyType="next"
                  keyboardType="email-address"
                  onChange={e => this.setState({email: e.nativeEvent.text})}
                />
              </Item>
              <Item regular style={styles.textInput}>
                <Icon active name='home' />
                <Input
                  placeholder="Alamat"
                  returnKeyType="next"
                  onChange={e => this.setState({alamat: e.nativeEvent.text})}
                />
              </Item>
              <Item regular style={styles.textInputBottom}>
                <Icon active name='call' />
                <Input
                  placeholder="No. Telepon"
                  keyboardType="phone-pad"
                  returnKeyType="go"
                  onChange={e => this.setState({telepon: e.nativeEvent.text})}
                />
              </Item>
              
              <Button iconLeft block rounded style={styles.button} onPress={() => this.submit()}>
                <Icon active name='list-box' />
                <Text>Daftar</Text>
              </Button>
            </Form>
          </Content>
        </LinearGradient>
      </Container>
    );
  }
}

const styles = {
  content: {
    backgroundColor: '#27ae60',
    flex: 1,
  },
  header: {
    backgroundColor: '#4B79A1',
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
