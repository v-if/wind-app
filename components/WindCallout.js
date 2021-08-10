import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, {
  Callout,
} from 'react-native-maps';
import Colors from './Colors';

const WindCallout = ({ info }) => {

  return (
    <Callout
      style={styles.callout}
    >
      <View>
        <Text>동네예보 : {info.location3}</Text>
        <Text>(ID:{info.id})</Text>
        <Text>Update</Text>
        <Text>{info.createDate}</Text>
      </View>
    </Callout>
  );
}

export default WindCallout;

const styles = StyleSheet.create({
  callout: {
    width: 140,
    padding: 2,
  },
});