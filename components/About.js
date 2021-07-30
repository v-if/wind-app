import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';
import packageJson from './../package.json';

export default function About({ navigation }) {

  // https://stackoverflow.com/a/48650614

  const win = Dimensions.get('window');
  // image 1(1067 x 683)
  const ratio = win.width/1067; //1019 is actual image width

  return (
    <View style={styles.container}>
      <Image
        style={{ width:win.width, height:683*ratio, marginTop: 4 }}
        source={require('./images/about.jpg')}
      />
      <Text>이 앱은 라이더들을 위해 만들어졌습니다.</Text>
      <Text>라이딩을 할때 순풍순풍 바람을 타고 가보세요.</Text>
      <Text></Text>
      <Text>기상청 Open API를 활용하여 자전거 도로 근처의</Text>
      <Text>동네예보를 표시하여 간접적으로 자전거도로의</Text>
      <Text> 바람, 강수, 기온을 확인할 수 있습니다.</Text>
      <Text></Text>
      <Text>이 앱이 마음에 드시면 마켓에서 평가, </Text>
      <Text>친구들에게 추천, 공유 해 주세요.</Text>
      <Text>version : {packageJson.version}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },

});