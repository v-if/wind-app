import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Colors from './Colors';

import imageHU_1 from './images/HU_1.jpg';
import imageHU_2 from './images/HU_2.jpg';
import imageHU_3 from './images/HU_3.jpg';
import imageHU_4 from './images/HU_4.jpg';

const HumidityMarker = ({ info }) => {
  let image
  let numReh = parseInt(info.reh)
  if(numReh <= 25) {
    image = imageHU_1
  } else if(numReh <= 50) {
    image = imageHU_2
  } else if(numReh <= 75) {
    image = imageHU_3
  } else {
    image = imageHU_4
  }

  return (
    <View style={styles.markerWrap}>
      <View style={styles.markerWrapItem}>
        <Text>습도</Text>
        <Image 
          style={styles.markerImage}
          source={image}
        />
        <Text>{info.reh}%</Text>
      </View>
    </View>
  );
}

export default HumidityMarker;

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