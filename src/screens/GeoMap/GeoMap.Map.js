import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Marker, Callout } from 'react-native-maps';
import styles from './GeoMap.Style';

const MapMarker = ({ mark }) => (
  mark.map(item => (
    <Marker key={item.id} {...item}>
      <Callout>
        <View>
          <Image style={styles.imageMarker} source={{ uri: item.info.image }} />
          <Text style={styles.titleMarker}>{item.info.title}</Text>
        </View>
      </Callout>
    </Marker>
  ))
);

MapMarker.propTypes = {
  mark: PropTypes.arrayOf().isRequired,
};

const MapWarung = ({ regionMap, marker, onRegionChange }) => (
  <View style={styles.container}>
    <MapView
      showsUserLocation
      loadingEnabled
      style={styles.map}
      region={regionMap}
      onRegionChange={onRegionChange}
    >
      <MapMarker mark={marker} />
    </MapView>
  </View>
);

MapWarung.propTypes = {
  regionMap: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }).isRequired,
  marker: PropTypes.arrayOf(PropTypes.shape({
    coordinate: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    info: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
    }),
  })).isRequired,
  onRegionChange: PropTypes.func.isRequired,
};

export default MapWarung;
