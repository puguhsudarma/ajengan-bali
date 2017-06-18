import {
  PermissionsAndroid,
  Platform,
} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {
  Alert,
} from './alert';

const GeoLocation = (callback) => {
  if (Platform.OS === 'android') {
    // check permission
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then(() => {
        // request permission if geolocation turn off
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message: '<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href="#">Learn more</a>',
          ok: 'YES',
          cancel: 'NO',
        })
          .then(() => {
            // Lets call the geolocation
            navigator.geolocation.getCurrentPosition(
              position => callback(position),
              err => Alert(err.message),
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
          }).catch(() => {
            Alert('Geolocation harus diaktifkan.');
          });
      }).catch(() => {
        Alert('Geolocation Permission Denied');
      });
  } else {
    Alert('On IOS Coming Soon!');
  }
};

export default GeoLocation;