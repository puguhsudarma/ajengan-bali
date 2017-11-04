import { ToastAndroid } from 'react-native';

export const toastGravity = (text, duration = 'long', position = 'bottom') => {
  let dur = null;
  let grav = null;
  if (duration === 'long') {
    dur = ToastAndroid.LONG;
  } else {
    dur = ToastAndroid.SHORT;
  }

  if (position === 'top') {
    grav = ToastAndroid.TOP;
  } else if (position === 'bottom') {
    grav = ToastAndroid.BOTTOM;
  } else {
    grav = ToastAndroid.CENTER;
  }

  return ToastAndroid.showWithGravity(text, dur, grav);
};

export const toast = (text, duration = 'long') => {
  const dur = (duration === 'long') ? ToastAndroid.LONG : ToastAndroid.SHORT;
  return ToastAndroid.show(text, dur);
};
