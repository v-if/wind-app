import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from './Colors';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  ProviderPropType,
  Callout,
} from 'react-native-maps';
import { getDistance } from 'geolib';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.4881455;
const LONGITUDE = 126.8749689;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class WindInfo extends React.Component {

  getPty(val) {
    let state = ''

    if(val == '0') {
      state = '없음'
    } else if(val == '1') {
      state = '비'
    } else if(val == '2') {
      state = '비/눈'
    } else if(val == '3') {
      state = '눈'
    } else if(val == '4') {
      state = '소나기'
    } else if(val == '5') {
      state = '빗방울'
    } else if(val == '6') {
      state = '빗방울/눈날림'
    } else if(val == '7') {
      state = '눈날림'
    }
    return state
  }

  getRn1(val) {
    let state = ''
    let n = parseFloat(val)

    if(n < 0.1) {
      state = '0mm'
    } else if(n >= 0.1 && n < 1.0) {
      state = '1mm미만'
    } else if(n >= 1.0 && n < 5.0) {
      state = '1~4mm'
    } else if(n >= 5.0 && n < 10.0) {
      state = '5~9mm'
    } else if(n >= 10.0 && n < 20.0) {
      state = '10~19mm'
    } else if(n >= 20.0 && n < 40.0) {
      state = '20~39mm'
    } else if(n >= 40.0 && n < 70.0) {
      state = '40~69mm'
    } else if(n >= 70.0) {
      state = '70mm이상'
    }
    return state
  }

  getWsd(val) {
    let state = ''
    let n = parseFloat(val)

    if(n < 4.0) {
      state = '바람이 약하다'
    } else if(n >= 4.0 && n < 9.0) {
      state = '바람이 약간 강하다'
    } else if(n >= 9.0 && n < 14.0) {
      state = '바람이 강하다'
    } else if(n >= 14.0) {
      state = '바람이 매우 강하다'
    }
    return state
  }

  render() {
    const { info } = this.props;
    return (
      <Callout
        style={styles.callout}
      >
        <View>
          <Text>ID:{info.id}</Text>
          <Text>{this.getPty(info.pty)}({this.getRn1(info.rn1)})</Text>
          <Text>기온:{info.t1h}℃</Text>
          <Text>풍속:{info.wsd}({this.getWsd(info.wsd)})</Text>
          <Text>풍향:{info.wd16}</Text>
        </View>
      </Callout>
    );
  }
}

WindInfo.propTypes = {
  info: PropTypes.object,
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      events: [],
      data: [],
    };
  }

  makeEvent(e, name) {
    return {
      id: id++,
      name,
      data: e.nativeEvent ? e.nativeEvent : e,
    };
  }

  recordEvent(name) {
    return e => {
      if (e.persist) {
        e.persist(); // Avoids warnings relating to https://fb.me/react-event-pooling
      }
      if(name == 'Map::onRegionChangeComplete') {
        //console.log('onRegionChangeComplete latitude %o:',e.latitude)
        //console.log('onRegionChangeComplete longitude %o:',e.longitude)
        this.setState({region: {latitude: e.latitude, longitude: e.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO}})

        //console.log('current latitude:'+this.state.region.latitude)
        //console.log('current longitude:'+this.state.region.longitude)

        //console.log('this.state.region %o:',this.state.region)
        //console.log('this.state.events %o:',this.state.events)
        //console.log('this.state.data %o:',this.state.data)
      } else if(name == 'Callout::onPress') {
        console.log('onPress')
      }
    };
  }

  componentDidMount() {
    const { navigation, route } = this.props;
    const { road, roadNm, latitude, longitude } = route.params;
    navigation.setOptions({ title: roadNm })
    this.setState({region: {latitude: parseFloat(latitude), longitude: parseFloat(longitude), latitudeDelta: LATITUDE_DELTA, longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO}})

    let url = 'http://118.67.129.162/api/wind'
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.setState({data: json.response}))
      .catch((error) => console.error(error))
      .finally(() => console.log('end '+url));
  }

  calculateDistance(origLat, origLon, markerLat, markerLon) {
    // https://stackoverflow.com/a/54915489
    return getDistance({latitude: origLat, longitude: origLon},
                      {latitude: markerLat, longitude: markerLon})
  }

  render() {
    // Events that are dependent on
    let googleProviderProps = {};
    if (this.props.provider === PROVIDER_GOOGLE) {
      googleProviderProps = {
        onUserLocationChange: this.recordEvent('Map::onUserLocationChange'),
      };
    }

    return (
      <View style={styles.container}>
        <MapView 
          provider={this.props.provider}
          style={styles.container}
          initialRegion={this.state.region}
          showsUserLocation
          showsMyLocationButton
          onRegionChange={this.recordEvent('Map::onRegionChange')}
          onRegionChangeComplete={this.recordEvent(
            'Map::onRegionChangeComplete'
          )}
        >
        {this.state.data.map(marker => {
          return <Marker
              key={marker.id}
              info={marker}
              coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
              title={"lat:"+marker.latitude+", lon:"+marker.longitude}
              description={"nx:"+marker.nx+", ny:"+marker.ny}
            >
              <WindInfo key={marker.id} info={marker} />
            </Marker>
        }).filter(marker => {
          let distance = this.calculateDistance(this.state.region.latitude, this.state.region.longitude, marker.props.info.latitude, marker.props.info.longitude)
          return distance <= 3000 // 3km
        })}
        </MapView>
      </View>
    );
  }
}

Map.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  callout: {
    width: 160,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default Map;