import React, { Component } from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Subtitle,
  Left,
  Right,
  Icon,
  Button,
} from 'native-base';
import {
  StyleSheet,
  View,
} from 'react-native';

import MapView from 'react-native-maps';

export default class GeoMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: 'Lokasi Warung',
        subtitle: 'Ajegli App',
      },
      regionMap: {
        latitude: -8.6836,
        longitude: 115.2129,
        latitudeDelta: 0.1171,
        longitudeDelta: 0.1510,
      },
      markers: [
        {
          latlng: {
            latitude: -8.6758,
            longitude: 115.09000,
          },
          title: 'Ini Title 1',
          description: 'Ini adalah deskripsi dari tempat tersebut 90.',
        },
        {
          latlng: {
            latitude: -8.6110,
            longitude: 115.2990,
          },
          title: 'Ini Title',
          description: 'Ini adalah deskripsi dari tempat tersebut.',
        },
      ],
    };
  }

  onRegionChange = (regionMap) => {
    // console.log(region);
    this.setState({ regionMap });
  }

  render() {
    const { header, regionMap, markers } = this.state;
    const { subtitle, title } = header;
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => goBack()}>
              <Icon name="arrow-round-back" />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
            <Subtitle style={styles.subtitle}>{subtitle.toUpperCase()}</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={() => { }}>
              <Icon name='search' />
            </Button>
          </Right>
        </Header>

        <View style={mapsStyle.container}>
          <MapView
            style={mapsStyle.map}
            region={regionMap}
            onRegionChange={this.onRegionChange}
          >
            {
              markers.map((marker, index) =>
                <MapView.Marker
                  key={index}
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.description}
                >
                  <MapView.Callout>

                  </MapView.Callout>
                </MapView.Marker>
              )
            }
          </MapView>
        </View>
      </Container>
    );
  }
}

const styles = {
  subtitle: {
    color: '#fff',
  },
};

const mapsStyle = StyleSheet.create({
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
});