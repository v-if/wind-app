import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import Colors from './Colors';
import MapView, {
  Marker,
  ProviderPropType,
  Callout,
} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.4881455;
const LONGITUDE = 126.8749689;
const LATITUDE_DELTA = 0.0622;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class WindCallout extends React.Component {

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
          <Text>{info.location3}</Text>
          <Text>{this.getPty(info.pty)}({this.getRn1(info.rn1)})</Text>
          <Text>기온:{info.t1h}℃</Text>
          <Text>풍속:{info.wsd}({this.getWsd(info.wsd)})</Text>
          <Text>풍향:{info.wd16}</Text>
          <Text>last update:{info.createDate}</Text>
        </View>
      </Callout>
    );
  }
}

WindCallout.propTypes = {
  info: PropTypes.object,
};

class WindMarker extends React.Component {

  render() {
    const { info } = this.props;
    var image
    if(info.wd16 == 'N') {
      image = require('./images/N.png')
    } else if(info.wd16 == 'NNE') {
      image = require('./images/NNE.png')
    } else if(info.wd16 == 'NE') {
      image = require('./images/NE.png')
    } else if(info.wd16 == 'ENE') {
      image = require('./images/ENE.png')
    } else if(info.wd16 == 'E') {
      image = require('./images/E.png')
    } else if(info.wd16 == 'ESE') {
      image = require('./images/ESE.png')
    } else if(info.wd16 == 'SE') {
      image = require('./images/SE.png')
    } else if(info.wd16 == 'SSE') {
      image = require('./images/SSE.png')
    } else if(info.wd16 == 'S') {
      image = require('./images/S.png')
    } else if(info.wd16 == 'SSW') {
      image = require('./images/SSW.png')
    } else if(info.wd16 == 'SW') {
      image = require('./images/SW.png')
    } else if(info.wd16 == 'WSW') {
      image = require('./images/WSW.png')
    } else if(info.wd16 == 'W') {
      image = require('./images/W.png')
    } else if(info.wd16 == 'WNW') {
      image = require('./images/WNW.png')
    } else if(info.wd16 == 'NW') {
      image = require('./images/NW.png')
    } else if(info.wd16 == 'NNW') {
      image = require('./images/NNW.png')
    } else {
      image = require('./images/N.png')
    }

    return (
      <View style={styles.markerWrap}>
        <View style={styles.markerWrapItem}>
          <Text>{info.wsd}</Text>
          <Text>풍속(m/x)</Text>
        </View>
        <View style={styles.markerWrapItem}>
          <Image
            style={{width: 40, height: 40}}
            source={image}
          />
          <Text>{info.wd16}</Text>
        </View>
      </View>
    );
  }
}

WindMarker.propTypes = {
  info: PropTypes.object,
};

class RainMarker extends React.Component {

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

  render() {
    const { info } = this.props;

    return (
      <View style={styles.markerWrap}>
        <View style={styles.markerWrapItem}>
        <Text>{this.getPty(info.pty)}({this.getRn1(info.rn1)})</Text>
          <Text>강수량</Text>
        </View>
        <View style={styles.markerWrapItem}>
          <Image
            style={{width: 40, height: 40}}
            source={require('./images/rain.png')}
          />
        </View>
      </View>
    );
  }
}

RainMarker.propTypes = {
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
      tp: 'wind',
    };
  }

  apiWindData(latitude, longitude) {
    let url = 'http://118.67.129.162/api/wind/data/'+latitude+'/'+longitude // dev
    //let url = 'http://10.190.10.77:5000/api/wind/data/'+latitude+'/'+longitude // local
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.setState({data: json.response}))
      .catch((error) => console.error(error))
      .finally(() => console.log('end '+url));
  }

  onWindButtonPress = () => {
    this.setState({tp: 'wind'})
  }

  onRainButtonPress = () => {
    this.setState({tp: 'rain'})
  }

  onRegionChangeComplete = (region) => {
    console.log("onRegionChangeComplete.. lat:"+region.latitude+", lon:"+region.longitude)
    this.apiWindData(region.latitude, region.longitude)
  }

  componentDidMount() {
    const { navigation, route } = this.props;
    const { roadNm, tp } = route.params;
    navigation.setOptions({ title: roadNm })

    this.setState({tp: tp})
  }

  render() {
    const { route } = this.props;
    const { latitude, longitude } = route.params;

    let region = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    return (
      <View style={styles.container}>
        <MapView 
          provider={this.props.provider}
          style={styles.container}
          initialRegion={region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
        {this.state.data.map(marker => {
          return <Marker
              key={marker.id}
              info={marker}
              tracksViewChanges={false}
              coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
              title={"lat:"+marker.latitude+", lon:"+marker.longitude}
              description={"nx:"+marker.nx+", ny:"+marker.ny}
            >
              {this.state.tp == 'wind' ? <WindMarker key={'wind_'+marker.id} info={marker} /> : <RainMarker key={'rain_'+marker.id} info={marker} />}
              <WindCallout key={'callout'+marker.id} info={marker} />
            </Marker>
        })}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bubble}
            onPress={this.onWindButtonPress}
          >
            <View>
              <Text>바람</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bubble}
            onPress={this.onRainButtonPress}
          >
            <View>
              <Text>강수</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  markerWrap: {
    width: 140,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderWidth: 1,
  },
  markerWrapItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    margin: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
});

export default Map;