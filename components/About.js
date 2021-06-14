import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Dimensions  } from 'react-native';
import packageJson from './../package.json';

export default function About({ navigation }) {

  // https://www.instagram.com/sunpungx2/
  // https://www.naver.com/sunpungx2/

  var {height, width} = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Image
        style={{width: width, height: 420}}
        source={require('./images/about.png')}
      />
      <Text>이 앱은 라이더들을 위해 만들어졌습니다.</Text>
      <Text>라이딩을 할때 순풍순풍 바람을 타고 가보세요.</Text>
      <Text>기상청 실시간 데이터를 이용하여</Text>
      <Text>바람, 강수, 기온 정보를 표시합니다.</Text>
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
  },
});