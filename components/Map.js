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

import imageN from './images/N.png';
import imageNE from './images/NE.png';
import imageNNE from './images/NNE.png';
import imageNW from './images/NW.png';
import imageNNW from './images/NNW.png';
import imageS from './images/S.png';
import imageSE from './images/SE.png';
import imageSSE from './images/SSE.png';
import imageSW from './images/SW.png';
import imageSSW from './images/SSW.png';
import imageE from './images/E.png';
import imageENE from './images/ENE.png';
import imageESE from './images/ESE.png';
import imageW from './images/W.png';
import imageWSW from './images/WSW.png';
import imageWNW from './images/WNW.png';

import imageDB01 from './images/DB01.jpg';
import imageDB01_N from './images/DB01_N.jpg';
import imageDB03 from './images/DB03.jpg';
import imageDB03_N from './images/DB03_N.jpg';
import imageDB04 from './images/DB04.jpg';
import imageDB04_N from './images/DB04_N.jpg';
import imageDB05 from './images/DB05.jpg';
import imageDB06 from './images/DB06.jpg';
import imageDB08 from './images/DB08.jpg';
import imageDB09 from './images/DB09.jpg';
import imageDB10 from './images/DB10.jpg';
import imageDB11 from './images/DB11.jpg';
import imageDB12 from './images/DB12.jpg';

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
        image = imageN
        wsNm = '북'
      } else if(info.wd16 == 'NE') {
        image = imageNE
        wsNm = '북동'
      } else if(info.wd16 == 'NNE') {
        image = imageNNE
        wsNm = '북북동'
      } else if(info.wd16 == 'NW') {
        image = imageNW
        wsNm = '북서'
      } else if(info.wd16 == 'NNW') {
        image = imageNNW
        wsNm = '북북서'
      }
    } else if(direction == 'S') {
      if(info.wd16 == 'S') {
        image = imageS
        wsNm = '남'
      } else if(info.wd16 == 'SE') {
        image = imageSE
        wsNm = '남동'
      } else if(info.wd16 == 'SSE') {
        image = imageSSE
        wsNm = '남남동'
      } else if(info.wd16 == 'SW') {
        image = imageSW
        wsNm = '남서'
      } else if(info.wd16 == 'SSW') {
        image = imageSSW
        wsNm = '남남서'
      } 
    } else if(direction == 'E') {
      if(info.wd16 == 'E') {
        image = imageE
        wsNm = '동'
      } else if(info.wd16 == 'ENE') {
        image = imageENE
        wsNm = '동북동'
      } else if(info.wd16 == 'ESE') {
        image = imageESE
        wsNm = '동남동'
      }
    } else if(direction == 'W') {
      if(info.wd16 == 'W') {
        image = imageW
        wsNm = '서'
      } else if(info.wd16 == 'WSW') {
        image = imageWSW
        wsNm = '서남서'
      } else if(info.wd16 == 'WNW') {
        image = imageWNW
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
          image = imagesDB01_N
          skyNm = '맑음'
        } else if(info.sky == '3') {
          image = imageDB03_N
          skyNm = '구름많음'
        } else if(info.sky == '4') {
          image = imageDB04_N
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
      image = imageDB10
      skyNm = '빗방울'
      skyDesc = getRn1(info.rn1)
    } else if(info.pty == '6') {
      image = imageDB11
      skyNm = '빗방울/눈날림'
      skyDesc = getRn1(info.rn1)
    } else if(info.pty == '7') {
      image = imageDB12
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
    console.log(data)

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
                  {this.state.tp == 'wind' ? <WindMarker key={'wind_'+marker.id} info={marker} /> : <RainMarker key={'rain_'+marker.id} info={marker} /> }
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
            <View>
              <Image style={styles.markerImage} source={imageN} />
              <Image style={styles.markerImage} source={imageNE} />
              <Image style={styles.markerImage} source={imageNNE} />
              <Image style={styles.markerImage} source={imageNW} />
              <Image style={styles.markerImage} source={imageNNW} />
              <Image style={styles.markerImage} source={imageS} />
              <Image style={styles.markerImage} source={imageSE} />
              <Image style={styles.markerImage} source={imageSSE} />
              <Image style={styles.markerImage} source={imageSW} />
              <Image style={styles.markerImage} source={imageSSW} />
              <Image style={styles.markerImage} source={imageE} />
              <Image style={styles.markerImage} source={imageENE} />
              <Image style={styles.markerImage} source={imageESE} />
              <Image style={styles.markerImage} source={imageW} />
              <Image style={styles.markerImage} source={imageWSW} />
              <Image style={styles.markerImage} source={imageWNW} />
              <Image style={styles.markerImage} source={imageDB01} />
              <Image style={styles.markerImage} source={imageDB01_N} />
              <Image style={styles.markerImage} source={imageDB03} />
              <Image style={styles.markerImage} source={imageDB03_N} />
              <Image style={styles.markerImage} source={imageDB04} />
              <Image style={styles.markerImage} source={imageDB04_N} />
              <Image style={styles.markerImage} source={imageDB05} />
              <Image style={styles.markerImage} source={imageDB06} />
              <Image style={styles.markerImage} source={imageDB08} />
              <Image style={styles.markerImage} source={imageDB09} />
              <Image style={styles.markerImage} source={imageDB10} />
              <Image style={styles.markerImage} source={imageDB11} />
              <Image style={styles.markerImage} source={imageDB12} />
            </View>
          </View>
        </View>
        <View style={styles.indicatorContainer}>
          {this.state.isLoading ? <Image style={{width: 300, height: 300}} source={require('./images/loading.gif')} /> : <View></View> }
        </View>
        <View style={styles.timezoneContainer}>
          {this.state.data.length > 0 ? 
            <View style={[styles.sliderWrap, this.state.data.length == 0 ? styles.padding10 : this.state.data.length == 6 ? styles.padding20 : this.state.data.length == 5 ? styles.padding30 : styles.padding40]}>
              <Slider
                // https://github.com/jeanregisser/react-native-slider
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
              return <TouchableOpacity 
              key={data.timezone}
              style={this.state.time == data.timezone ? styles.timezoneSeleted : styles.timezone}
                onPress={() => this.onTimezoneButtonPress(data.timezone)}
                >
                <Text style={this.state.time == data.timezone ? styles.timezoneFontSeleted : styles.timezoneFont}>
                  {data.timezone.substring(8, 10)}:{data.timezone.substring(10, 12)}
                </Text>
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
    width: 140,
    padding: 2,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: Colors.white,
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
    resizeMode:'cover' 
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
    borderRadius: 10,
    padding: 10,
  },
  timezoneWrap: {
    flexDirection: 'row',
    marginBottom: 20,
    opacity: 0.9,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  padding10: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  padding15: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  padding20: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  padding25: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  padding30: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  padding35: {
    paddingLeft: 35,
    paddingRight: 35,
  },
  padding40: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  padding45: {
    paddingLeft: 45,
    paddingRight: 45,
  },
  padding50: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  padding55: {
    paddingLeft: 55,
    paddingRight: 55,
  },
  timezone: {
    flex: 1,
    backgroundColor: Colors.transform,
    alignItems: 'center',
  },
  timezoneSeleted: {
    flex: 1,
    backgroundColor: Colors.transform,
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
  sliderWrap: {
    flexDirection: 'row',
    height: 30,
    opacity: 0.9,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  slider: {
    flex: 1,
  },
  button1Container: {
    backgroundColor: Colors.balck,
    width: 63,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
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