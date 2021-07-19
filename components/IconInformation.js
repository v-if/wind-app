import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';

export default function IconInformation({ navigation }) {

  var {height, width} = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>바람 16방위</Text>
      <Image
        style={{width: width, height: 250, marginTop: 4, resizeMode: 'stretch',}}
        source={require('./images/wind16.jpg')}
      />

      <Text style={styles.title}>날씨기호 설명</Text>
      <View style={styles.header}>
        <View style={styles.column}>
          <Text>날씨기호</Text>
        </View>
        <View style={styles.column}>
          <Text>설명</Text>
        </View>
        <View style={styles.column}>
          <Text>날씨기호</Text>
        </View>
        <View style={styles.column}>
          <Text>설명</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Image
            style={styles.image}
            source={require('./images/DB01.jpg')}
          />
        </View>
        <View style={styles.column}>
          <Text>맑음</Text>
        </View>
        <View style={styles.column}>
          <Image
            style={styles.image}
            source={require('./images/DB01_N.jpg')}
          />
        </View>
        <View style={styles.column}>
          <Text>맑음(밤)</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Image
            style={styles.image}
            source={require('./images/DB03.jpg')}
          />
        </View>
        <View style={styles.column}>
          <Text>구름많음</Text>
        </View>
        <View style={styles.column}>
          <Image
            style={styles.image}
            source={require('./images/DB03_N.jpg')}
          />
        </View>
        <View style={styles.column}>
          <Text>구름많음(밤)</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Image
            style={styles.image}
            source={require('./images/DB05.jpg')}
          />
        </View>
        <View style={styles.column}>
          <Text>비</Text>
        </View>
        <View style={styles.column}>
          <Image
            style={styles.image}
            source={require('./images/DB08.jpg')}
          />
        </View>
        <View style={styles.column}>
          <Text>눈</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Image
            style={styles.image}
            source={require('./images/DB04.jpg')}
          />
        </View>
        <View style={styles.column}>
          <Text>흐림</Text>
        </View>
        <View style={styles.column}>
          <Image
            style={styles.image}
            source={require('./images/DB06.jpg')}
          />
        </View>
        <View style={styles.column}>
          <Text>비 또는 눈</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Image
            style={styles.image}
            source={require('./images/DB09.jpg')}
          />
        </View>
        <View style={styles.column}>
          <Text>소나기</Text>
        </View>
        <View style={styles.column}>
        </View>
        <View style={styles.column}>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    margin: 4,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
  },
  header: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: Colors.light,
  },
  row: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.black,
    borderWidth: 1,
  },
  image: {
    width: 30,
    height: 30,
  },
});