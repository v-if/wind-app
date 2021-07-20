import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import Colors from './Colors';

export default function IconInformation({ navigation }) {

  // https://stackoverflow.com/a/48650614

  const win = Dimensions.get('window');
  // image 1(1019 x 1440)
  const ratio = win.width/1019; //1019 is actual image width

  // image 2(905 x 1280)
  const ratio2 = win.width/905; //905 is actual image width

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          style={{ width:win.width, height:1440*ratio, marginTop: 10 }}
          resizeMode='contain'
          source={require('./images/info_wind2.jpg')}
        />
        <Image
          style={{ width:win.width, height:1280*ratio2 }}
          resizeMode='contain'
          source={require('./images/info_weather.jpg')}
        />
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
});