import {
  PermissionsAndroid,
  Platform,
} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {
  Alert,
} from './alert';

const GeoLocation = () => {
  return new Promise((res, rej) => {
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
                  res(position);
                },
                err => {
                  Alert(err.message);
                  rej({ errno: 1, msg: err.message });
                },
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 }
              );
            }).catch(() => {
              Alert('Geolocation harus diaktifkan.');
              rej({ errno: 2, msg: 'Geolocation harus diaktifkan.' });
            });
        }).catch(() => {
          Alert('Geolocation Permission Denied.');
          rej({ errno: 3, msg: 'Geolocation Permission Denied.' });
        });
    } else {
      Alert('On IOS Coming Soon!');
      rej({ errno: 4, msg: 'On IOS Coming Soon!' });
    }
  });
};
export default GeoLocation;