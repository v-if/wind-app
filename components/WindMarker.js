import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Colors from './Colors';

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

const WindMarker = ({ info }) => {
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

export default WindMarker;

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