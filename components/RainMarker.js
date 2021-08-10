import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Colors from './Colors';

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

const RainMarker = ({ info }) => {
  let image = null
  let skyNm = ''
  let skyDesc = ''

  let currentTime = info.forecastTime.substring(8, 12)

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

export default RainMarker;

const styles = StyleSheet.create({
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
    width: 30, 
    height: 30,
    resizeMode:'cover' 
  },
});