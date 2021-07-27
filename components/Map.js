import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from './Colors';
import PropTypes from 'prop-types';
import MapView, {
  Marker,
  ProviderPropType,
  Callout,
} from 'react-native-maps';

import imageN_1 from './images/N_1.png';
import imageN_2 from './images/N_2.png';
import imageN_3 from './images/N_3.png';
import imageNE_1 from './images/NE_1.png';
import imageNE_2 from './images/NE_2.png';
import imageNE_3 from './images/NE_3.png';
import imageNNE_1 from './images/NNE_1.png';
import imageNNE_2 from './images/NNE_2.png';
import imageNNE_3 from './images/NNE_3.png';
import imageNW_1 from './images/NW_1.png';
import imageNW_2 from './images/NW_2.png';
import imageNW_3 from './images/NW_3.png';
import imageNNW_1 from './images/NNW_1.png';
import imageNNW_2 from './images/NNW_2.png';
import imageNNW_3 from './images/NNW_3.png';
import imageS_1 from './images/S_1.png';
import imageS_2 from './images/S_2.png';
import imageS_3 from './images/S_3.png';
import imageSE_1 from './images/SE_1.png';
import imageSE_2 from './images/SE_2.png';
import imageSE_3 from './images/SE_3.png';
import imageSSE_1 from './images/SSE_1.png';
import imageSSE_2 from './images/SSE_2.png';
import imageSSE_3 from './images/SSE_3.png';
import imageSW_1 from './images/SW_1.png';
import imageSW_2 from './images/SW_2.png';
import imageSW_3 from './images/SW_3.png';
import imageSSW_1 from './images/SSW_1.png';
import imageSSW_2 from './images/SSW_2.png';
import imageSSW_3 from './images/SSW_3.png';
import imageE_1 from './images/E_1.png';
import imageE_2 from './images/E_2.png';
import imageE_3 from './images/E_3.png';
import imageENE_1 from './images/ENE_1.png';
import imageENE_2 from './images/ENE_2.png';
import imageENE_3 from './images/ENE_3.png';
import imageESE_1 from './images/ESE_1.png';
import imageESE_2 from './images/ESE_2.png';
import imageESE_3 from './images/ESE_3.png';
import imageW_1 from './images/W_1.png';
import imageW_2 from './images/W_2.png';
import imageW_3 from './images/W_3.png';
import imageWSW_1 from './images/WSW_1.png';
import imageWSW_2 from './images/WSW_2.png';
import imageWSW_3 from './images/WSW_3.png';
import imageWNW_1 from './images/WNW_1.png';
import imageWNW_2 from './images/WNW_2.png';
import imageWNW_3 from './images/WNW_3.png';

import imageDB01 from './images/DB01.jpg';
import imageDB01_N from './images/DB01_N.jpg';
import imageDB03 from './images/DB03.jpg';
import imageDB03_N from './images/DB03_N.jpg';
import imageDB04 from './images/DB04.jpg';
import imageDB05 from './images/DB05.jpg';
import imageDB06 from './images/DB06.jpg';
import imageDB08 from './images/DB08.jpg';
import imageDB09 from './images/DB09.jpg';
import imageDB11 from './images/DB11.jpg';

const _ = require('lodash')

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.4881455;
const LONGITUDE = 126.8749689;
const LATITUDE_DELTA = 0.0622;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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

class WindMarker extends React.Component {

  render() {
    const { info } = this.props;
    let image = null
    let wsNm = ''

    let direction = info.wd16.substring(0, 1)
    if(direction == 'N') {
      if(info.wd16 == 'N') {
        image = info.wsd < 4 ? imageN_1 : info.wsd < 9 ? imageN_2 : imageN_3
        wsNm = '북'
      } else if(info.wd16 == 'NE') {
        image = info.wsd < 4 ? imageNE_1 : info.wsd < 9 ? imageNE_2 : imageNE_3
        wsNm = '북동'
      } else if(info.wd16 == 'NNE') {
        image = info.wsd < 4 ? imageNNE_1 : info.wsd < 9 ? imageNNE_2 : imageNNE_3
        wsNm = '북북동'
      } else if(info.wd16 == 'NW') {
        image = info.wsd < 4 ? imageNW_1 : info.wsd < 9 ? imageNW_2 : imageNW_3
        wsNm = '북서'
      } else if(info.wd16 == 'NNW') {
        image = info.wsd < 4 ? imageNNW_1 : info.wsd < 9 ? imageNNW_2 : imageNNW_3
        wsNm = '북북서'
      }
    } else if(direction == 'S') {
      if(info.wd16 == 'S') {
        image = info.wsd < 4 ? imageS_1 : info.wsd < 9 ? imageS_2 : imageS_3
        wsNm = '남'
      } else if(info.wd16 == 'SE') {
        image = info.wsd < 4 ? imageSE_1 : info.wsd < 9 ? imageSE_2 : imageSE_3
        wsNm = '남동'
      } else if(info.wd16 == 'SSE') {
        image = info.wsd < 4 ? imageSSE_1 : info.wsd < 9 ? imageSSE_2 : imageSSE_3
        wsNm = '남남동'
      } else if(info.wd16 == 'SW') {
        image = info.wsd < 4 ? imageSW_1 : info.wsd < 9 ? imageSW_2 : imageSW_3
        wsNm = '남서'
      } else if(info.wd16 == 'SSW') {
        image = info.wsd < 4 ? imageSSW_1 : info.wsd < 9 ? imageSSW_2 : imageSSW_3
        wsNm = '남남서'
      } 
    } else if(direction == 'E') {
      if(info.wd16 == 'E') {
        image = info.wsd < 4 ? imageE_1 : info.wsd < 9 ? imageE_2 : imageE_3
        wsNm = '동'
      } else if(info.wd16 == 'ENE') {
        image = info.wsd < 4 ? imageENE_1 : info.wsd < 9 ? imageENE_2 : imageENE_3
        wsNm = '동북동'
      } else if(info.wd16 == 'ESE') {
        image = info.wsd < 4 ? imageESE_1 : info.wsd < 9 ? imageESE_2 : imageESE_3
        wsNm = '동남동'
      }
    } else if(direction == 'W') {
      if(info.wd16 == 'W') {
        image = info.wsd < 4 ? imageW_1 : info.wsd < 9 ? imageW_2 : imageW_3
        wsNm = '서'
      } else if(info.wd16 == 'WSW') {
        image = info.wsd < 4 ? imageWSW_1 : info.wsd < 9 ? imageWSW_2 : imageWSW_3
        wsNm = '서남서'
      } else if(info.wd16 == 'WNW') {
        image = info.wsd < 4 ? imageWNW_1 : info.wsd < 9 ? imageWNW_2 : imageWNW_3
        wsNm = '서북서'
      } 
    }

    return (
      <View style={styles.markerWrap}>
        <View style={styles.markerWrapItem}>
          <Image 
            style={styles.markerImage}
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

    let currentTime = info.forecastTime.substring(8, 12)

    let image, skyNm
    let skyDesc = ''
    if(info.pty == '0') {
      if(currentTime >= '0600' && currentTime <= '2000') {
        if(info.sky == '1') {
          image = imageDB01
          skyNm = '맑음'
        } else if(info.sky == '3') {
          image = imageDB03
          skyNm = '구름많음'
        } else if(info.sky == '4') {
          image = imageDB04
          skyNm = '흐림'
        }
      } else {
        if(info.sky == '1') {
          image = imageDB01_N
          skyNm = '맑음'
        } else if(info.sky == '3') {
          image = imageDB03_N
          skyNm = '구름많음'
        } else if(info.sky == '4') {
          image = imageDB04
          skyNm = '흐림'
        }
      }
    } else if(info.pty == '1') {
      image = imageDB05
      skyNm = '비'
      skyDesc = getRn1(info.rn1)
    } else if(info.pty == '2') {
      image = imageDB06
      skyNm = '비/눈'
      skyDesc = getRn1(info.rn1)
    } else if(info.pty == '3') {
      image = imageDB08
      skyNm = '눈'
      skyDesc = getRn1(info.rn1)
    } else if(info.pty == '4') {
      image = imageDB09
      skyNm = '소나기'
      skyDesc = getRn1(info.rn1)
    } else if(info.pty == '5') {
      image = imageDB05
      skyNm = '빗방울'
      skyDesc = getRn1(info.rn1)
    } else if(info.pty == '6') {
      image = imageDB11
      skyNm = '빗방울/눈날림'
      skyDesc = getRn1(info.rn1)
    } else if(info.pty == '7') {
      image = imageDB08
      skyNm = '눈날림'
      skyDesc = getRn1(info.rn1)
    }

    return (
      <View style={styles.markerWrap}>
        <View style={styles.markerWrapItem}>
          <Image 
            style={styles.markerImage}
            source={image}
          />
          {skyDesc == '' ? <Text>{skyNm}</Text> : <View style={styles.markerWrapItem}><Text>{skyNm}</Text><Text>{skyDesc}</Text></View>}
          <Text>{info.t1h}℃</Text>
        </View>
      </View>
    );
  }
}

RainMarker.propTypes = {
  info: PropTypes.object,
};

class HumidityMarker extends React.Component {

  render() {
    const { info } = this.props;

    return (
      <View style={styles.markerWrap}>
        <View style={styles.markerWrapItem}>
          <Text>습도</Text>
          <Text>{info.reh}%</Text>
        </View>
      </View>
    );
  }
}

HumidityMarker.propTypes = {
  info: PropTypes.object,
};

class WindCallout extends React.Component {

  render() {
    const { info } = this.props;
    return (
      <Callout
        style={styles.callout}
      >
        <View>
          <Text>동네예보 : {info.location3}</Text>
          <Text>(ID:{info.id})</Text>
          <Text>Update</Text>
          <Text>{info.createDate}</Text>
        </View>
      </Callout>
    );
  }
}

WindCallout.propTypes = {
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
      time: '',
      timeSeq: 0,
      data: [],
      tp: 'wind',
      isLoading: true,
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
    //console.log(data)

    if(data.length > 0) {
      if(this.state.time == '') {
        this.setState({data: data, time: data['0'].timezone, isLoading: false})
      } else {
        this.setState({data: data, isLoading: false})
      }
    }
  }

  apiWindData(latitude, longitude) {
    //this.setState({isLoading: true})
    // api/wind/data/
    //let url = 'http://10.190.10.77:5000/api/wind/data/'+latitude+'/'+longitude // local
    //let url = 'http://118.67.129.162/api/wind/data/'+latitude+'/'+longitude // dev    

    // api/wind/forecast
    let url = 'http://118.67.129.162/api/wind/forecast/'+latitude+'/'+longitude // dev    
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.dataProcessing(json.response))
      .catch((error) => console.error(error))
      .finally(() => console.log(url)); // this.setState({isLoading: false})
  }

  onTimezoneSeqButtonPress = (seq) => {
    this.setState({time: this.state.data[seq].timezone})
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

  onHumidityButtonPress = () => {
    this.setState({tp: 'humidity'})
  }

  onTempButtonPress = () => {
    this.setState({tp: 'temp'})
  }

  onRegionChangeComplete = (region) => {
    //console.log("onRegionChangeComplete.. lat:"+region.latitude+", lon:"+region.longitude)

    let level = Math.log2(360 * (width / 256 / region.longitudeDelta)) + 1
    console.log(`onRegionChangeComplete lat:${region.latitude}, lon:${region.longitude}, level:${level}`)
    this.apiWindData(region.latitude, region.longitude)
  }

  componentDidMount() {
    const { navigation, route } = this.props;
    const { roadNm, tp } = route.params;
    navigation.setOptions({ title: roadNm })
  }

  render() {
    const { route } = this.props;
    const { latitude, longitude } = route.params;

    const win = Dimensions.get('window');

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
          style={styles.map}
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
                  { this.state.tp == 'wind' ? <WindMarker key={'wind_'+marker.id} info={marker} /> : 
                    this.state.tp == 'rain' ? <RainMarker key={'rain_'+marker.id} info={marker} />  : <HumidityMarker key={'humidity_'+marker.id} info={marker} /> }
                  <WindCallout key={'callout'+marker.id} info={marker} />
                </Marker>
              })
            })
          }
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
                <Text style={this.state.tp == 'rain' ? styles.bubbleFontSeleted : styles.bubbleFont}>날씨</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={this.state.tp == 'humidity' ? styles.bubbleSeleted : styles.bubble}
              onPress={this.onHumidityButtonPress}
            >
              <View>
                <Text style={this.state.tp == 'humidity' ? styles.bubbleFontSeleted : styles.bubbleFont}>습도</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ position: 'absolute', top: win.width/2 }}>
          {this.state.isLoading ? <Image style={{width: 300, height: 300}} source={require('./images/loading.gif')} /> : <View></View> }
        </View>
        <View style={styles.timezoneContainer}>
          {this.state.data.length > 0 ? 
            <View style={{
              width: win.width-20, 
              height: 30,
              flexDirection: 'row',
              opacity: 0.9,
              backgroundColor: Colors.white,
              alignItems: 'center',
              justifyContent: 'flex-end',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingLeft: this.state.data.length == 0 ? 10 : this.state.data.length == 6 ? 20 : this.state.data.length == 5 ? 30 : 40,
              paddingRight: this.state.data.length == 0 ? 10 : this.state.data.length == 6 ? 20 : this.state.data.length == 5 ? 30 : 40,
              }}>
              <Slider
                // https://github.com/callstack/react-native-slider
                style={styles.slider}
                value={this.state.timeSeq}
                minimumValue={0}
                maximumValue={this.state.data.length > 0 ? this.state.data.length - 1 : 1}
                step={1}
                onValueChange={value => this.onTimezoneSeqButtonPress(value)}
              />
            </View>
            : <View></View>
          }
          <View style={styles.timezoneWrap}>
            {this.state.data.map(data => {
              return <View 
                  key={data.timezone}
                  style={styles.timezone}
                >
                <Text style={this.state.time == data.timezone ? styles.timezoneFontSeleted : styles.timezoneFont}>
                  {data.timezone.substring(8, 10)}:{data.timezone.substring(10, 12)}
                </Text>
              </View>
            })}
          </View>
        </View>
        <View style={{width: 0, height: 0}}>
          <Image style={styles.markerImage} source={imageN_1} />
          <Image style={styles.markerImage} source={imageN_2} />
          <Image style={styles.markerImage} source={imageN_3} />
          <Image style={styles.markerImage} source={imageNE_1} />
          <Image style={styles.markerImage} source={imageNE_2} />
          <Image style={styles.markerImage} source={imageNE_3} />
          <Image style={styles.markerImage} source={imageNNE_1} />
          <Image style={styles.markerImage} source={imageNNE_2} />
          <Image style={styles.markerImage} source={imageNNE_3} />
          <Image style={styles.markerImage} source={imageNW_1} />
          <Image style={styles.markerImage} source={imageNW_2} />
          <Image style={styles.markerImage} source={imageNW_3} />
          <Image style={styles.markerImage} source={imageNNW_1} />
          <Image style={styles.markerImage} source={imageNNW_2} />
          <Image style={styles.markerImage} source={imageNNW_3} />
          <Image style={styles.markerImage} source={imageS_1} />
          <Image style={styles.markerImage} source={imageS_2} />
          <Image style={styles.markerImage} source={imageS_3} />
          <Image style={styles.markerImage} source={imageSE_1} />
          <Image style={styles.markerImage} source={imageSE_2} />
          <Image style={styles.markerImage} source={imageSE_3} />
          <Image style={styles.markerImage} source={imageSSE_1} />
          <Image style={styles.markerImage} source={imageSSE_2} />
          <Image style={styles.markerImage} source={imageSSE_3} />
          <Image style={styles.markerImage} source={imageSW_1} />
          <Image style={styles.markerImage} source={imageSW_2} />
          <Image style={styles.markerImage} source={imageSW_3} />
          <Image style={styles.markerImage} source={imageSSW_1} />
          <Image style={styles.markerImage} source={imageSSW_2} />
          <Image style={styles.markerImage} source={imageSSW_3} />
          <Image style={styles.markerImage} source={imageE_1} />
          <Image style={styles.markerImage} source={imageE_2} />
          <Image style={styles.markerImage} source={imageE_3} />
          <Image style={styles.markerImage} source={imageENE_1} />
          <Image style={styles.markerImage} source={imageENE_2} />
          <Image style={styles.markerImage} source={imageENE_3} />
          <Image style={styles.markerImage} source={imageESE_1} />
          <Image style={styles.markerImage} source={imageESE_2} />
          <Image style={styles.markerImage} source={imageESE_3} />
          <Image style={styles.markerImage} source={imageW_1} />
          <Image style={styles.markerImage} source={imageW_2} />
          <Image style={styles.markerImage} source={imageW_3} />
          <Image style={styles.markerImage} source={imageWSW_1} />
          <Image style={styles.markerImage} source={imageWSW_2} />
          <Image style={styles.markerImage} source={imageWSW_3} />
          <Image style={styles.markerImage} source={imageWNW_1} />
          <Image style={styles.markerImage} source={imageWNW_2} />
          <Image style={styles.markerImage} source={imageWNW_3} />
          <Image style={styles.markerImage} source={imageDB01} />
          <Image style={styles.markerImage} source={imageDB01_N} />
          <Image style={styles.markerImage} source={imageDB03} />
          <Image style={styles.markerImage} source={imageDB03_N} />
          <Image style={styles.markerImage} source={imageDB04} />
          <Image style={styles.markerImage} source={imageDB05} />
          <Image style={styles.markerImage} source={imageDB06} />
          <Image style={styles.markerImage} source={imageDB08} />
          <Image style={styles.markerImage} source={imageDB09} />
          <Image style={styles.markerImage} source={imageDB11} />
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
    width: 140,
    padding: 2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerWrap: {
    width: 80,
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
    resizeMode:'cover' 
  },
  timezoneContainer: {
    position: 'absolute',
    bottom: 0,
    margin: 10,
  },
  timezoneWrap: {
    flexDirection: 'row',
    marginBottom: 20,
    opacity: 0.9,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  timezone: {
    flex: 1,
    alignItems: 'center',
  },
  timezoneFont: {
    color: Colors.black,
    fontSize: 13,
  },
  timezoneFontSeleted: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  slider: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    margin: 10,
  },
  buttonWrap: {
    width: 65,
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
