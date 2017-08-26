import React from 'react';
import {
  Form as FormNB,
  Item,
  Icon,
  Input,
  Button,
  Text,
  Spinner,
} from 'native-base';
import PropTypes from 'prop-types';
import styles from './Login.Style';

const Form = ({ loading, onChangeTextEmail, onChangeTextPassword, onLogin, msg }) => (
  <FormNB>
    <Text style={styles.textMsg}>{msg}</Text>
    <Item regular disabled={loading} style={styles.textInputEmail}>
      <Icon name="mail" />
      <Input
        disabled={loading}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={onChangeTextEmail}
        returnKeyType="next"
      />
    </Item>
    <Item regular disabled={loading} style={styles.textInputPassword}>
      <Icon name="key" />
      <Input
        disabled={loading}
        placeholder="Password"
        secureTextEntry
        onChangeText={onChangeTextPassword}
        returnKeyType="go"
        onSubmitEditing={onLogin}
      />
    </Item>
    <Button
      iconLeft
      block
      disabled={loading}
      onPress={onLogin}
      style={styles.buttonSignIn}
    >
      {
        loading ?
          <Spinner color="#fff" /> :
          <Icon name="return-right" />
      }
      <Text>Masuk</Text>
    </Button>
  </FormNB>
);

Form.propTypes = {
  loading: PropTypes.bool.isRequired,
  onChangeTextEmail: PropTypes.func.isRequired,
  onChangeTextPassword: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
};

export default Form;
