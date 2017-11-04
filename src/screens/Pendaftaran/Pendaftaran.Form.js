import React from 'react';
import {
  Form as FormNB,
  Item as ItemNB,
  Icon,
  Input,
  Button,
  Spinner,
  Text,
} from 'native-base';
import PropTypes from 'prop-types';
import styles from './Pendaftaran.Style';

const Item = ({
  loading,
  icon,
  placeholder,
  returnKeyType,
  onChangeText,
  secureTextEntry,
  keyboardType }) => (
    <ItemNB disabled={loading} regular style={styles.textInput}>
      <Icon active name={icon} />
      <Input
        disabled={loading}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </ItemNB>
  );

Item.propTypes = {
  loading: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  returnKeyType: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
};

Item.defaultProps = {
  secureTextEntry: false,
  keyboardType: 'default',
};

const Form = ({ loading, msg, onChangeText, onSignUp }) => (
  <FormNB style={styles.form}>
    <Text style={styles.msg}>{msg}</Text>
    <Item
      loading={loading}
      icon="people"
      placeholder="Nama Lengkap"
      returnKeyType="next"
      onChangeText={onChangeText.nama}
    />
    <Item
      loading={loading}
      icon="outlet"
      placeholder="Username"
      returnKeyType="next"
      onChangeText={onChangeText.username}
    />
    <Item
      loading={loading}
      icon="key"
      placeholder="Password"
      returnKeyType="next"
      onChangeText={onChangeText.password}
      secureTextEntry
    />
    <Item
      loading={loading}
      icon="mail"
      placeholder="Email"
      returnKeyType="next"
      keyboardType="email-address"
      onChangeText={onChangeText.email}
    />
    <Item
      loading={loading}
      icon="home"
      placeholder="Alamat"
      returnKeyType="next"
      onChangeText={onChangeText.alamat}
    />
    <Item
      loading={loading}
      icon="call"
      placeholder="No. Telepon"
      keyboardType="phone-pad"
      returnKeyType="go"
      onChangeText={onChangeText.telepon}
    />

    <Button
      disabled={loading}
      iconLeft
      block
      style={styles.button}
      onPress={onSignUp}
    >
      {
        (loading && <Spinner color="#fff" />) ||
        (!loading && <Icon active name="list-box" />)
      }
      <Text>Daftar</Text>
    </Button>
  </FormNB >
);

Form.propTypes = {
  loading: PropTypes.bool.isRequired,
  msg: PropTypes.string.isRequired,
  onChangeText: PropTypes.shape().isRequired,
  onSignUp: PropTypes.func.isRequired,
};

export default Form;
