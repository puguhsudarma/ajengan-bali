import { StyleSheet } from 'react-native';
import WIDTH from './GeoMap.Const';

const styles = StyleSheet.create({
  // container: {
  //   ...StyleSheet.absoluteFillObject,
  //   height: 400,
  //   width: 400,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  // map: {
  //   ...StyleSheet.absoluteFillObject,
  // },

  container: {
    // position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageMarker: {
    height: 200,
    width: WIDTH - 50,
    marginTop: 20,
  },
  titleMarker: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default styles;
