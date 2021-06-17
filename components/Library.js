import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet  } from 'react-native';

export default function Library({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.title}>Open API</Text>
        <Text style={styles.desc}>- 기상청 동네예보 초단기예보조회</Text>
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>Open Source</Text>
        <Text style={styles.desc}>- React Native</Text>
        <Text style={styles.desc}>- @react-navigation/native</Text>
        <Text style={styles.desc}>- @react-navigation/stack</Text>
        <Text style={styles.desc}>- react-native-splash-screen</Text>
        <Text style={styles.desc}>- react-native-super-grid</Text>
        <Text style={styles.desc}>- react-native-maps</Text>
        <Text style={styles.desc}>- react-native-webview</Text>
        <Text style={styles.desc}>- react-native-svg</Text>
        <Text style={styles.desc}>- react-native-vector-icons</Text>
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>Server</Text>
        <Text style={styles.desc}>- Spring Boot</Text>
        <Text style={styles.desc}>- MySQL</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  group: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 16,
  },
});