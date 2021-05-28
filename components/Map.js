import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import MapView from 'react-native-maps';
import Colors from './Colors';

export default function Map({ navigation, route }) {
  const { road, roadNm } = route.params;

  navigation.setOptions({ title: roadNm })

  return (
    <MapView style={styles.container}
      initialRegion={{
        latitude: 37.488718,
        longitude: 126.871701,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
