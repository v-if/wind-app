import Svg, { Image, } from 'react-native-svg';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import Colors from './Colors';
import MapView, {
  Marker,
  ProviderPropType,
  Callout,
} from 'react-native-maps';

const _ = require('lodash')

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

function getSky(val) {
  let state = ''

  if(val = '1') {
    state = '맑음'
  } else if(val = '3') {
    state = '구름많음'
  } else if(val = '4') {
    state = '흐림'
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
          <Text>동네예보 : {info.location3}</Text>
          <Text>sky:{getSky(info.sky)}</Text>
          <Text>{info.forecastTime}</Text>
          <Text>update:{info.createDate}</Text>
          <Text>(ID:{info.id})</Text>
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
    let image, wsNm

    let direction = info.wd16.substring(0, 1)
    if(direction == 'N') {
      if(info.wd16 == 'N') {
        image = require('./images/N.png')
        wsNm = '북'
      } else if(info.wd16 == 'NE') {
        image = require('./images/NE.png')
        wsNm = '북동'
      } else if(info.wd16 == 'NNE') {
        image = require('./images/NNE.png')
        wsNm = '북북동'
      } else if(info.wd16 == 'NW') {
        image = require('./images/NW.png')
        wsNm = '북서'
      } else if(info.wd16 == 'NNW') {
        image = require('./images/NNW.png')
        wsNm = '북북서'
      }
    } else if(direction == 'S') {
      if(info.wd16 == 'S') {
        image = require('./images/S.png')
        wsNm = '남'
      } else if(info.wd16 == 'SE') {
        image = require('./images/SE.png')
        wsNm = '남동'
      } else if(info.wd16 == 'SSE') {
        image = require('./images/SSE.png')
        wsNm = '남남동'
      } else if(info.wd16 == 'SW') {
        image = require('./images/SW.png')
        wsNm = '남서'
      } else if(info.wd16 == 'SSW') {
        image = require('./images/SSW.png')
        wsNm = '남남서'
      } 
    } else if(direction == 'E') {
      if(info.wd16 == 'E') {
        image = require('./images/E.png')
        wsNm = '동'
      } else if(info.wd16 == 'ENE') {
        image = require('./images/ENE.png')
        wsNm = '동북동'
      } else if(info.wd16 == 'ESE') {
        image = require('./images/ESE.png')
        wsNm = '동남동'
      }
    } else if(direction == 'W') {
      if(info.wd16 == 'W') {
        image = require('./images/W.png')
        wsNm = '서'
      } else if(info.wd16 == 'WSW') {
        image = require('./images/WSW.png')
        wsNm = '서남서'
      } else if(info.wd16 == 'WNW') {
        image = require('./images/WNW.png')
        wsNm = '서북서'
      } 
    }

    return (
      <View style={styles.markerWrap}>
        <View style={styles.markerWrapItem}>
          <Svg height="30" width="30">
            <Image
              width="100%"
              height="100%"
              href={image}
            />
          </Svg>
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

    let currentTime = info.forecastTime.substring(8, 12)

    let image, skyNm
    if(info.pty == '0') {
      if(currentTime >= '0600' && currentTime <= '2000') {
        if(info.sky == '1') {
          image = require('./images/DB01.png')
        } else if(info.sky == '3') {
          image = require('./images/DB03.png')
        } else if(info.sky == '4') {
          image = require('./images/DB04.png')
        }
      } else {
        if(info.sky == '1') {
          image = require('./images/DB01_N.png')
        } else if(info.sky == '3') {
          image = require('./images/DB03_N.png')
        } else if(info.sky == '4') {
          image = require('./images/DB04_N.png')
        }
      }
      skyNm = '없음'
    } else if(info.pty == '1') {
      image = require('./images/DB05.png')
      skyNm = '비'
    } else if(info.pty == '2') {
      image = require('./images/DB06.png')
      skyNm = '비/눈'
    } else if(info.pty == '3') {
      image = require('./images/DB08.png')
      skyNm = '눈'
    } else if(info.pty == '4') {
      image = require('./images/DB09.png')
      skyNm = '소나기'
    } else if(info.pty == '5') {
      image = require('./images/DB10.png')
      skyNm = '빗방울'
    } else if(info.pty == '6') {
      image = require('./images/DB11.png')
      skyNm = '빗방울/눈날림'
    } else if(info.pty == '7') {
      image = require('./images/DB12.png')
      skyNm = '눈날림'
    }

    return (
      <View style={styles.markerWrap}>
        <View style={styles.markerWrapItem}>
          <Svg height="30" width="30">
            <Image
              width="100%"
              height="100%"
              href={image}
            />
          </Svg>
          <Text>{skyNm}</Text>
          <Text>{getRn1(info.rn1)}</Text>
        </View>
      </View>
    );
  }
}

RainMarker.propTypes = {
  info: PropTypes.object,
};

class TempMarker extends React.Component {

  render() {
    const { info } = this.props;

    let currentTime = info.forecastTime.substring(8, 12)

    let image, skyNm
    // 낮 : 06:00 ~ 20:00
    // 밤 : 20:00 ~ 05:00
    if(info.pty == '0') {
      if(currentTime >= '0600' && currentTime <= '2000') {
        if(info.sky == '1') {
          image = require('./images/DB01.png')
          skyNm = '맑음'
        } else if(info.sky == '3') {
          image = require('./images/DB03.png')
          skyNm = '구름많음'
        } else if(info.sky == '4') {
          image = require('./images/DB04.png')
          skyNm = '흐림'
        }
      } else {
        if(info.sky == '1') {
          image = require('./images/DB01_N.png')
          skyNm = '맑음'
        } else if(info.sky == '3') {
          image = require('./images/DB03_N.png')
          skyNm = '구름많음'
        } else if(info.sky == '4') {
          image = require('./images/DB04_N.png')
          skyNm = '흐림'
        }
      }
    } else if(info.pty == '1') {
      image = require('./images/DB05.png')
      skyNm = '비'
    } else if(info.pty == '2') {
      image = require('./images/DB06.png')
      skyNm = '비/눈'
    } else if(info.pty == '3') {
      image = require('./images/DB08.png')
      skyNm = '눈'
    } else if(info.pty == '4') {
      image = require('./images/DB09.png')
      skyNm = '소나기'
    } else if(info.pty == '5') {
      image = require('./images/DB10.png')
      skyNm = '빗방울'
    } else if(info.pty == '6') {
      image = require('./images/DB11.png')
      skyNm = '빗방울/눈날림'
    } else if(info.pty == '7') {
      image = require('./images/DB12.png')
      skyNm = '눈날림'
    }

    return (
      <View style={styles.markerWrap}>
        <View style={styles.markerWrapItem}>
          <Svg height="30" width="30">
            <Image
              width="100%"
              height="100%"
              href={image}
            />
          </Svg>
          <Text>{skyNm}</Text>
          <Text>{info.t1h}℃</Text>
        </View>
      </View>
    );
  }
}

TempMarker.propTypes = {
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
      timezone: [],
      time: '',
      data: [],
      tp: 'wind',
      isLoading: false,
    };
  }

  dataProcessing(res) {
    let groups  = _.groupBy(res, 'forecastTime')
    let merge = _.map(groups , function(value, key) {
      return {
        timezone: key,
        marker: value
      }
    })

    let data = _.orderBy(merge, ['timezone'], ['asc'])

    if(this.state.time == '') {
      this.setState({time: data['0'].timezone})
    }
    this.setState({data: data})
  }

  apiWindData(latitude, longitude) {
    this.setState({isLoading: true})
    // api/wind/data/
    //let url = 'http://10.190.10.77:5000/api/wind/data/'+latitude+'/'+longitude // local
    //let url = 'http://118.67.129.162/api/wind/data/'+latitude+'/'+longitude // dev    

    // api/wind/forecast
    let url = 'http://118.67.129.162/api/wind/forecast/'+latitude+'/'+longitude // dev    
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.dataProcessing(json.response))
      .catch((error) => console.error(error))
      .finally(() => this.setState({isLoading: false}));
  }

  onTimezoneButtonPress = (time) => {
    this.setState({time: time})
  }

  onWindButtonPress = () => {
    this.setState({tp: 'wind'})
  }

  onRainButtonPress = () => {
    this.setState({tp: 'rain'})
  }

  onTempButtonPress = () => {
    this.setState({tp: 'temp'})
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

    var {height, width} = Dimensions.get('window');

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
          {this.state.data
            .filter(data => data.timezone == this.state.time)
            .map(data => {
              return data.marker.map(marker => {
                return <Marker
                  key={marker.id}
                  info={marker}
                  tracksViewChanges={false}
                  coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
                  title={"lat:"+marker.latitude+", lon:"+marker.longitude}
                  description={"nx:"+marker.nx+", ny:"+marker.ny}
                >
                  {this.state.tp == 'wind' ? <WindMarker key={'wind_'+marker.id} info={marker} /> : this.state.tp == 'rain' ? <RainMarker key={'rain_'+marker.id} info={marker} /> : <TempMarker key={'temp_'+marker.id} info={marker} /> }
                  <WindCallout key={'callout'+marker.id} info={marker} />
                </Marker>
              })
            })}
        </MapView>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrap}>
            <TouchableOpacity
              style={this.state.tp == 'wind' ? styles.bubbleSeleted : styles.bubble}
              onPress={this.onWindButtonPress}
            >
              <View>
                <Text style={this.state.tp == 'wind' ? styles.bubbleFontSeleted : styles.bubbleFont}>바람</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={this.state.tp == 'rain' ? styles.bubbleSeleted : styles.bubble}
              onPress={this.onRainButtonPress}
            >
              <View>
                <Text style={this.state.tp == 'rain' ? styles.bubbleFontSeleted : styles.bubbleFont}>강수</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={this.state.tp == 'temp' ? styles.bubbleSeleted : styles.bubble}
              onPress={this.onTempButtonPress}
            >
              <View>
                <Text style={this.state.tp == 'temp' ? styles.bubbleFontSeleted : styles.bubbleFont}>기온</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.indicatorContainer}>
          {this.state.isLoading ? <ActivityIndicator/> : <View></View> }
        </View>
        <View style={styles.timezoneContainer}>
          <View style={styles.timezoneWrap}>
            {this.state.data.map(data => {
              return <TouchableOpacity 
              key={data.timezone}
              style={this.state.time == data.timezone ? styles.bubbleSeleted : styles.bubble}
                onPress={() => this.onTimezoneButtonPress(data.timezone)}
                >
                <Text>{data.timezone.substring(8, 10)}:{data.timezone.substring(10, 12)}</Text>
              </TouchableOpacity>
            })}
          </View>
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
    flex: 1,
    backgroundColor: Colors.black,
    flexDirection: 'column',
  },
  markerWrap: {
    width: 70,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 10,
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
  indicatorContainer: {
    flex: 1,
    backgroundColor: Colors.transform,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  timezoneContainer: {
    flex: 1,
    backgroundColor: Colors.transform,
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 10,
  },
  timezoneWrap: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: Colors.transform,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    margin: 10,
  },
  buttonWrap: {
    width: 63,
  },
  bubble: {
    backgroundColor: Colors.clouds,
    opacity: 0.9,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  bubbleFont: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  bubbleSeleted: {
    backgroundColor: Colors.peter_river,
    opacity: 0.9,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  bubbleFontSeleted: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Map;