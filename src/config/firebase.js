import RNFirebase from 'react-native-firebase';

const configurationOptions = {
  debug: false,
  persistence: false,
  errorOnMissingPlayServices: false,
};

const firebase = RNFirebase.initializeApp(configurationOptions);

export default firebase;
