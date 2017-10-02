import { PermissionsAndroid } from 'react-native';
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
  new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(
    position => resolve(position),
    err => reject(err),
    { enableHighAccuracy, timeout, maximumAge },
  ))
);

const dialogPermission = () => (
  new Promise((resolve, reject) =>
    LocationDialogBox.checkLocationServicesIsEnabled({ message, ok, cancel })
      .then(() => resolve(true))
      .catch(() => reject(false)),
  )
);

const geoLocation = async () => {
  try {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    await dialogPermission();
    return coordinate();
  } catch (err) {
    throw err;
  }
};

export default geoLocation;
