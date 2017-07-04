import {
  PermissionsAndroid,
  Platform,
  AsyncStorage,
} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

/**
 * get coordinate location
 * 
 * @returns 
 */
const location = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => { reject(err); },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 }
    );
  });
};

/**
 * show dialog to confirm geolocation permission
 * 
 * @returns 
 */
const dialogGeoPermission = async () => {
  const enabled = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
    message: '<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location',
    ok: 'YES',
    cancel: 'NO',
  }).catch(err => err);

  return Object.is(enabled, 'enabled');
};

/**
 * store coordinate location to AsyncStorage RN
 * 
 * @param {any} key 
 * @param {any} loc 
 * @returns 
 */
const storeLocation = async (key, loc) => {
  try {
    const obj = { lat: loc.coords.latitude, long: loc.coords.longitude, };
    return await AsyncStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    throw err;
  }
};

/**
 * get coordinate location from AsyncStorage RN
 * 
 * @returns 
 */
const fetchLocation = async () => {
  try {
    const value = await AsyncStorage.getItem('@user:coordinate');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (err) {
    throw err;
  }
};

/**
 * primary component function to get coordinate location
 * 
 * @returns 
 */
const GeoLocation = async () => {
  try {
    if (Platform.OS === 'android') {
      // check permission
      const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (!permission) {
        throw 'Akses Geolocation ditolak.';
      }

      const check = await dialogGeoPermission();
      if (!check) {
        throw 'Geolocation harus diaktifkan.';
      }

      return await storeLocation('@user:coordinate', await location());
      // in iOS
    } else {
      return await storeLocation('@user:coordinate', await location());
    }
  } catch (err) {
    throw err;
  }
};

/**
 * to check is there coordinate location saved in AsyncStorage RN
 * 
 * @returns 
 */
const isSavedLocation = async () => {
  try {
    const value = await AsyncStorage.getItem('@user:coordinate');
    if (value === null) {
      return false;
    }
    return true;
  } catch (err) {
    throw err;
  }
};

export {
  GeoLocation,
  isSavedLocation,
  fetchLocation,
};