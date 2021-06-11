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

function getPty(val) {
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

function getRn1(val) {
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

function getWsd(val) {
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

class WindCallout extends React.Component {

  render() {
    const { info } = this.props;
    return (
      <Callout
        style={styles.callout}
      >
        <View>
          <Text>ID:{info.id}</Text>
          <Text>{info.location3}</Text>
          <Text>{getPty(info.pty)}({getRn1(info.rn1)})</Text>
          <Text>기온:{info.t1h}℃</Text>
          <Text>습도:{info.reh}%</Text>
          <Text>풍속:{info.wsd}m/s({getWsd(info.wsd)})</Text>
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
    var wsNm

    if(info.wd16 == 'N') {
      image = require('./images/N.png')
      wsNm = '북'
    } else if(info.wd16 == 'NNE') {
      image = require('./images/NNE.png')
      wsNm = '북북동'
    } else if(info.wd16 == 'NE') {
      image = require('./images/NE.png')
      wsNm = '북동'
    } else if(info.wd16 == 'ENE') {
      image = require('./images/ENE.png')
      wsNm = '동북동'
    } else if(info.wd16 == 'E') {
      image = require('./images/E.png')
      wsNm = '동'
    } else if(info.wd16 == 'ESE') {
      image = require('./images/ESE.png')
      wsNm = '동남동'
    } else if(info.wd16 == 'SE') {
      image = require('./images/SE.png')
      wsNm = '남동'
    } else if(info.wd16 == 'SSE') {
      image = require('./images/SSE.png')
      wsNm = '남남동'
    } else if(info.wd16 == 'S') {
      image = require('./images/S.png')
      wsNm = '남'
    } else if(info.wd16 == 'SSW') {
      image = require('./images/SSW.png')
      wsNm = '남남서'
    } else if(info.wd16 == 'SW') {
      image = require('./images/SW.png')
      wsNm = '남서'
    } else if(info.wd16 == 'WSW') {
      image = require('./images/WSW.png')
      wsNm = '서남서'
    } else if(info.wd16 == 'W') {
      image = require('./images/W.png')
      wsNm = '서'
    } else if(info.wd16 == 'WNW') {
      image = require('./images/WNW.png')
      wsNm = '서북서'
    } else if(info.wd16 == 'NW') {
      image = require('./images/NW.png')
      wsNm = '북서'
    } else if(info.wd16 == 'NNW') {
      image = require('./images/NNW.png')
      wsNm = '북북서'
    } else {
      image = require('./images/N.png')
      wsNm = '정보없음'
    }

    return (
      <View style={styles.markerWrap}>
        <View style={styles.markerWrapItem}>
          <Image
            style={styles.markerImage}
            resizeMode={'cover'}
            source={image}
          />
          <Text>{wsNm}</Text>
          <Text>({info.wsd}m/s)</Text>
        </View>
      </View>
    );
  }
}

WindMarker.propTypes = {
  info: PropTypes.object,
};

class RainMarker extends React.Component {

  render() {
    const { info } = this.props;

    return (
      <View style={styles.markerWrap}>
        <View style={styles.markerWrapItem}>
        <Text>{getPty(info.pty)}({getRn1(info.rn1)})</Text>
          <Text>강수량</Text>
        </View>
        <View style={styles.markerWrapItem}>
          <Image
            style={styles.markerImage}
            resizeMode={'cover'}
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
   //let url = 'http://10.190.10.77:5000/api/wind/data/'+latitude+'/'+longitude // local
    let url = 'http://118.67.129.162/api/wind/data/'+latitude+'/'+longitude // dev    
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
    //console.log("onRegionChangeComplete.. lat:"+region.latitude+", lon:"+region.longitude)
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
    width: 80,
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
  markerImage: {
    flex: 1, 
    width: 30, 
    height: 30, 
    transform: [{ scale: 0.8 }]
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