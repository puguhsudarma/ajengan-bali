import React, { Component } from 'react';
import { TouchableOpacity, } from 'react-native';
import { Text, Form, Item, Input, Button, View, Icon, Spinner, } from 'native-base';
// import Hr from 'react-native-hr';
import { NavigationActions } from 'react-navigation';
import { loginWithEmailPassword, } from '../firebase';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Ajegli',
      msg: '',
      username: '',
      password: '',
      loading: false,
    };
  }

  login = async () => {
    this.setState({ loading: true });
    const { dispatch, } = this.props.navigation;
    const { username, password } = this.state;

    // validate
    if (username === '' || password === '') {
      this.setState({ msg: 'Username dan password tidak boleh kosong!', loading: false, });
      return;
    }

    try {
      const loging = await loginWithEmailPassword(username, password);
      if (loging) {
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Authorized' })
          ],
        }));
      }
    } catch (err) {
      this.setState({ msg: 'Username atau password salah!', loading: false, });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { title, msg, loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.textMsg}>{msg}</Text>
          <Form>
            <Item regular disabled={loading} style={styles.textInputEmail}>
              <Icon name="mail" />
              <Input
                disabled={loading}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={username => this.setState({ username })}
                returnKeyType="next"
              />
            </Item>
            <Item regular disabled={loading} style={styles.textInputPassword}>
              <Icon name="key" />
              <Input
                disabled={loading}
                placeholder="Password"
                secureTextEntry
                onChangeText={password => this.setState({ password })}
                returnKeyType="go"
                onSubmitEditing={() => this.login()}
              />
            </Item>
            <Button iconLeft block rounded disabled={loading} onPress={() => this.login()} style={styles.buttonSignIn}>
              {
                loading ?
                  <Spinner color='#fff' /> :
                  <Icon name="return-right" />
              }
              <Text>Masuk</Text>
            </Button>
          </Form>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30, }}>
            <Text style={styles.textSignUp}>Belum punya akun ?&nbsp;</Text>
            <TouchableOpacity disabled={loading} style={{ backgroundColor: '#fff', padding: 5, borderRadius: 5, }} onPress={() => navigate('pendaftaran')}>
              <Text style={styles.textLinkSignup}>
                Daftar sekarang
              </Text>
            </TouchableOpacity>
          </View>

          {/*<Hr lineColor={'#fff'} text='Atau Masuk Dengan' textColor='#fff' />
          <Button disabled={loading} block iconLeft rounded onPress={() => {}} style={styles.buttonGmail}>
            <Icon name="logo-google" />
            <Text>Gmail</Text>
          </Button>*/}
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
