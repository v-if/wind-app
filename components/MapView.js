import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import RNMapView, { Marker, Circle } from 'react-native-maps';
import Slider from '@react-native-community/slider';
import Colors from './Colors';
import WindMarker from './WindMarker';
import RainMarker from './RainMarker';
import HumidityMarker from './HumidityMarker';
import WindCallout from './WindCallout';

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

import imageHU_1 from './images/HU_1.jpg';
import imageHU_2 from './images/HU_2.jpg';
import imageHU_3 from './images/HU_3.jpg';
import imageHU_4 from './images/HU_4.jpg';

const _ = require('lodash')

const { width, height } = Dimensions.get('window');

const MapView = ({ coords }) => {
  const mapRef = useRef(null);
  const [time, setTime] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tp, setTp] = useState('wind');

  useEffect(() => {
    if (!!coords && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 14,
      });
    }
  }, [coords]);

  function dataProcessing(res) {
    let groups  = _.groupBy(res, 'forecastTime')
    let merge = _.map(groups , function(value, key) {
      return {
        timezone: key,
        marker: value
      }
    })

    let data = _.orderBy(merge, ['timezone'], ['asc'])
    //console.log(data)
    if(data.length == 0) {
      data = []
    }

    if(time == '') {
      //this.setState({data: data, time: data['0'].timezone, isLoading: false})
      setData(data)
      setIsLoading(false)
      if(data.length > 0) {
        setTime(data['0'].timezone)
      }
    } else {
      //this.setState({data: data, isLoading: false})
      setData(data)
      setIsLoading(false)
    }
  }
  
  function apiWindData(latitude, longitude, level) {
    //this.setState({isLoading: true})
    // api/wind/data/
    //let url = 'http://10.190.10.77:5000/api/wind/data/'+latitude+'/'+longitude // local
    //let url = 'http://118.67.129.162/api/wind/data/'+latitude+'/'+longitude // dev    

    // api/wind/forecast
    //let url = 'http://10.190.10.77:5000/api/wind/forecast/'+latitude+'/'+longitude+'/'+level // local
    let url = 'http://118.67.129.162/api/wind/forecast/'+latitude+'/'+longitude+'/'+level // dev    
    fetch(url)
      .then((response) => response.json())
      .then((json) => dataProcessing(json.response))
      .catch((error) => console.error(error))
      .finally(() => console.log(url)); // this.setState({isLoading: false})
  }

  function regionChangeComplete(region) {
    let level = parseInt(Math.log2(360 * (width / 256 / region.longitudeDelta)) + 1)
    //console.log(`onRegionChangeComplete lat:${region.latitude}, lon:${region.longitude}, level:${level}`)
    apiWindData(region.latitude, region.longitude, level)
  }

  return (
    <View style={styles.container}>
      <RNMapView
        ref={mapRef}
        initialCamera={{
          altitude: 15000,
          center: {
            latitude: 37.566674,
            longitude: 126.978415,
          },
          heading: 0,
          pitch: 0,
          zoom: 14,
        }}
        loadingEnabled
        loadingBackgroundColor="white"
        style={StyleSheet.absoluteFillObject}
        rotateEnabled={false}
        onRegionChangeComplete={(region) => {
          //console.log(`onRegionChangeComplete lat:${region.latitude}, lon:${region.longitude}`)
          regionChangeComplete(region)
        }}
      >
        {data.filter(data => data.timezone == time)
          .map(data => {
            return data.marker.map(marker => {
              return  <Marker
                        key={marker.id}
                        info={marker}
                        tracksViewChanges={false}
                        coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
                        title={"lat:"+marker.latitude+", lon:"+marker.longitude}
                        description={"nx:"+marker.nx+", ny:"+marker.ny}
                      >
                        { tp == 'wind' ? <WindMarker key={'wind_'+marker.id} info={marker} /> : 
                          tp == 'rain' ? <RainMarker key={'rain_'+marker.id} info={marker} /> : <HumidityMarker key={'humidity_'+marker.id} info={marker} /> }
                        <WindCallout key={'callout'+marker.id} info={marker} />
                      </Marker>
            })
          })
        }
        {!!coords && mapRef.current ?
        <Circle
          center={{latitude: coords.latitude, longitude: coords.longitude}}
          radius={60}
          fillColor="rgba(255, 0, 0, 1)"
          strokeColor="rgba(255, 0, 0, 0.4)"
          zIndex={2}
          strokeWidth={10}
        /> :
        <View></View>
        }
      </RNMapView>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrap}>
          <TouchableOpacity
            style={tp == 'wind' ? styles.bubbleSeleted : styles.bubble}
            onPress={() => {
              setTp('wind')
            }}
          >
            <View>
              <Text style={tp == 'wind' ? styles.bubbleFontSeleted : styles.bubbleFont}>바람</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tp == 'rain' ? styles.bubbleSeleted : styles.bubble}
            onPress={() => {
              setTp('rain')
            }}
          >
            <View>
              <Text style={tp == 'rain' ? styles.bubbleFontSeleted : styles.bubbleFont}>날씨</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tp == 'humidity' ? styles.bubbleSeleted : styles.bubble}
            onPress={() => {
              setTp('humidity')
            }}
          >
            <View>
              <Text style={tp == 'humidity' ? styles.bubbleFontSeleted : styles.bubbleFont}>습도</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.timezoneContainer}>
        {data.length > 0 ? 
          <View style={{
            width: width-20, 
            height: 30,
            flexDirection: 'row',
            opacity: 0.9,
            backgroundColor: Colors.white,
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingLeft: data.length == 0 ? 10 : data.length == 6 ? 20 : data.length == 5 ? 30 : 40,
            paddingRight: data.length == 0 ? 10 : data.length == 6 ? 20 : data.length == 5 ? 30 : 40,
            }}>
            <Slider
              // https://github.com/callstack/react-native-slider
              style={styles.slider}
              value={0}
              minimumValue={0}
              maximumValue={data.length > 0 ? data.length - 1 : 1}
              step={1}
              onValueChange={(value) => {
                setTime(data[value].timezone)
              }}
            />
          </View>
          : <View></View>
        }
        <View style={styles.timezoneWrap}>
          {data.map(data => {
            return <View 
                key={data.timezone}
                style={styles.timezone}
              >
              <Text style={time == data.timezone ? styles.timezoneFontSeleted : styles.timezoneFont}>
                {data.timezone.substring(8, 10)}:{data.timezone.substring(10, 12)}
              </Text>
            </View>
          })}
        </View>
      </View>
      <View style={{ position: 'absolute', top: -1000, flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
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
        </View>
        <View style={{ flexDirection: 'row' }}>
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
        </View>
        <View style={{ flexDirection: 'row' }}>
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
        </View>
        <View style={{ flexDirection: 'row' }}>
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
        </View>
        <View style={{ flexDirection: 'row' }}>
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
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.markerImage} source={imageDB03} />
          <Image style={styles.markerImage} source={imageDB03_N} />
          <Image style={styles.markerImage} source={imageDB04} />
          <Image style={styles.markerImage} source={imageDB05} />
          <Image style={styles.markerImage} source={imageDB06} />

          <Image style={styles.markerImage} source={imageDB08} />
          <Image style={styles.markerImage} source={imageDB09} />
          <Image style={styles.markerImage} source={imageDB11} />
          <Image style={styles.markerImage} source={imageHU_1} />
          <Image style={styles.markerImage} source={imageHU_2} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.markerImage} source={imageHU_3} />
          <Image style={styles.markerImage} source={imageHU_4} />
        </View>
      </View>
    </View>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
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
  markerImage: {
    width: 30, 
    height: 30,
    resizeMode:'cover' 
  },
});