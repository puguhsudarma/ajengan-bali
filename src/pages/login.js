import React, { Component } from 'react';
import { AsyncStorage, TouchableOpacity, } from 'react-native';
import { Text, Form, Item, Input, Button, View, Icon } from 'native-base';
import Hr from 'react-native-hr';
import { NavigationActions } from 'react-navigation';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Ajegli',
      msg: '',
      username: '',
      password: '',
    };
  }

  login = () => {
    const { dispatch, } = this.props.navigation;
    // const { username, password } = this.state;
    // const pattern = {
    //   username: 'user',
    //   password: 'user',
    // };

    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Authorized' })
      ],
    }));

    // if (username == pattern.username && password == pattern.password) {
    //   this.setState({ msg: '' });

    // } else {
    //   this.setState({ msg: 'Username atau password salah!' });
    // }
  }

  render() {
    AsyncStorage.getItem('user@coordinate').then(val => console.log(JSON.parse(val)));
    const { navigate } = this.props.navigation;
    const { title, msg } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.textMsg}>{msg}</Text>
          <Form>
            <Item regular style={styles.textInputEmail}>
              <Icon name="mail" />
              <Input
                placeholder="Email"
                keyboardType="email-address"
                onChange={
                  username => this.setState({ username: username.nativeEvent.text })
                }
                returnKeyType="next"
              />
            </Item>
            <Item regular style={styles.textInputPassword}>
              <Icon name="key" />
              <Input
                placeholder="Password"
                secureTextEntry
                onChange={
                  password => this.setState({ password: password.nativeEvent.text })
                }
                returnKeyType="go"
                onSubmitEditing={
                  () => this.login()
                }
              />
            </Item>
            <Button iconLeft block rounded onPress={() => this.login()} style={styles.buttonSignIn}>
              <Icon name="return-right" />
              <Text>Masuk</Text>
            </Button>
          </Form>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30, }}>
            <Text style={styles.textSignUp}>Belum punya akun ?&nbsp;</Text>
            <TouchableOpacity style={{ backgroundColor: '#fff', padding: 5, borderRadius: 5, }} onPress={() => navigate('pendaftaran')}>
              <Text style={styles.textLinkSignup}>
                Daftar sekarang
              </Text>
            </TouchableOpacity>
          </View>

          <Hr lineColor={'#fff'} text='Atau Masuk Dengan' textColor='#fff' />
          <Button block iconLeft rounded onPress={() => { }} style={styles.buttonGmail}>
            <Icon name="logo-google" />
            <Text>Gmail</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#3498db',
    flex: 1,
  },
  titleContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 45,
    textAlign: 'center',
  },
  formContainer: {
    flexGrow: 1,
    paddingHorizontal: 20
  },
  textMsg: {
    textAlign: 'center',
    paddingBottom: 15,
    color: 'red',
  },
  textSignUp: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  textLinkSignup: {
    color: '#2980b9',
  },
  buttonSignIn: {
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: '#ED8F03'
  },
  buttonGmail: {
    marginTop: 15,
    backgroundColor: '#e74c3c',
  },
  textInputEmail: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textInputPassword: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  grid: {
    paddingTop: 10,
  },
  colFb: {
    paddingRight: 5,
  },
  colGmail: {
    paddingLeft: 5,
  }
};
