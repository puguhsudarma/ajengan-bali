import { PermissionsAndroid, Platform } from 'react-native';
import LocationDialogBox from 'react-native-android-location-services-dialog-box';
import {
  enableHighAccuracy,
  maximumAge,
  timeout,
  message,
  ok,
  cancel,
} from './CoordinateGps.Const';

const coordinate = () => (
  Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(
    position => resolve(position),
    err => reject(err),
    { enableHighAccuracy, timeout, maximumAge },
  ))
);

const dialogPermission = () => (
  Promise((resolve, reject) =>
    LocationDialogBox.checkLocationServicesIsEnabled({ message, ok, cancel })
      .then(() => resolve(true))
      .catch(() => reject(false)),
  )
);

const GeoLocation = async () => {
  try {
    // in Android
    if (Platform.OS === 'android') {
      // check permission
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (!permission) {
        throw new Error('Akses Geolocation ditolak.');
      }

      const check = await dialogPermission();
      if (!check) {
        throw new Error('Geolocation harus diaktifkan.');
      }

      return await storeLocation('@user:coordinate', await coordinate());
    }

    // in iOS
    return await storeLocation('@user:coordinate', await coordinate());
  } catch (err) {
    throw err;
  }
};

export default GeoLocation;
