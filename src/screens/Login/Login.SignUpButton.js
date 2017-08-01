import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './Login.Style';

const SignUpButton = ({ loading, navigate }) => (
  <View style={styles.signUpContainer}>
    <Text style={styles.textSignUp}>Belum punya akun ?&nbsp;</Text>
    <TouchableOpacity disabled={loading} style={styles.buttonSignUp} onPress={navigate}>
      <Text style={styles.textLinkSignup}>
        Daftar sekarang
      </Text>
    </TouchableOpacity>
  </View>
);

SignUpButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default SignUpButton;
