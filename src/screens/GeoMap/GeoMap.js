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
  Text,
  Thumbnail,
} from 'native-base';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

import warung from '../images/warung1.jpg';

const { width: WIDTH } = Dimensions.get('window');
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
          coordinate: {
            latitude: -8.6758,
            longitude: 115.09000,
          },
          info: {
            title: 'Warung Bu Candra',
            image: warung,
          },
        },
        {
          coordinate: {
            latitude: -8.6110,
            longitude: 115.2990,
          },
          info: {
            title: 'Warung Nasi Singaraja',
            image: { uri: 'http://lorempixel.com/400/200/' },
          },

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
    const { goBack, navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigate('DrawerOpen')}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
            <Subtitle style={styles.subtitle}>{subtitle.toUpperCase()}</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={() => { }}>
              <Icon name='refresh' />
            </Button>
          </Right>
        </Header>

        <View style={mapsStyle.container}>
          <MapView
            style={mapsStyle.map}
            region={regionMap}
            onRegionChange={this.onRegionChange}
            showsUserLocation={true}
            loadingEnabled={true}
          >
            {
              markers.map((marker, index) =>
                <Marker
                  key={index}
                  {...marker}
                >
                  <Callout>
                    <View>
                      <Thumbnail
                        square
                        style={{ height: 200, width: WIDTH-50, marginTop: 20, }}
                        source={marker.info.image}
                      />
                      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', marginTop: 10, marginBottom: 10, }}>{marker.info.title}</Text>
                    </View>
                  </Callout>
                </Marker>
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