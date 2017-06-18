// import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';

const AlertGrav = (text, duration = 'long', position = 'center') => {
  const dur = (duration === 'long') ? ToastAndroid.LONG : ToastAndroid.SHORT;
  const grav = (position === 'top') ? ToastAndroid.TOP : (position === 'bottom') ? ToastAndroid.BOTTOM : ToastAndroid.CENTER;
  ToastAndroid.showWithGravity(text, dur, grav);
};

AlertGrav.defaultProps = {
  duration: 'long',
  grav: 'bottom',
};

const Alert = (text, duration = 'long') => {
  const dur = (duration === 'long') ? ToastAndroid.LONG : ToastAndroid.SHORT;
  ToastAndroid.show(text, dur);
};

Alert.defaultProps = {
  duration: 'long',
  grav: 'bottom',
};

export {
  AlertGrav,
  Alert,
} ;