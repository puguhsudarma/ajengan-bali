import {
  PermissionsAndroid,
  Platform,
} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {
  Alert,
} from './alert';

const GeoLocation = (callback, error) => {
  if (Platform.OS === 'android') {
    // check permission
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then(() => {
        // request permission if geolocation turn off
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message: '<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location',
          ok: 'YES',
          cancel: 'NO',
        })
          .then(() => {
            // Lets call the geolocation
            navigator.geolocation.getCurrentPosition(
              position => {
                callback(position);
                return;
              },
              err => {
                Alert(err.message);
                error({errno: 1, msg : err.message});
                return;
              },
              { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 }
            );
          }).catch(() => {
            Alert('Geolocation harus diaktifkan.');
            error({errno: 2, msg : 'Geolocation harus diaktifkan.'});
          });
      }).catch(() => {
        Alert('Geolocation Permission Denied.');
        error({errno: 3, msg : 'Geolocation Permission Denied.'});
      });
  } else {
    Alert('On IOS Coming Soon!');
    error({errno: 4, msg : 'On IOS Coming Soon!'});
  }
};

export default GeoLocation;