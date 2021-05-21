import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import Colors from './Colors';

export default function WindMap({ navigation, route }) {
  const { road, roadNm } = route.params;

  navigation.setOptions({ title: roadNm })

  return (
    <ImageBackground
      source={{ uri: "http://118.67.129.162/images/" + road }}
      style={styles.container}
      >
      <View style={styles.row}>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
        <View style={styles.case4}></View>
        <View style={styles.case3}></View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  case3: {
    flex: 1,
    backgroundColor: Colors.black,
    opacity: 0.3,
  },
  case4: {
    flex: 1,
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
});
