import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import Colors from './Colors';

export default function Map({ navigation, route }) {
  const [data, setData] = useState([]);
  const { road, roadNm, latitude, longitude } = route.params;

  useEffect(() => {
    fetch('http://118.67.129.162/api/wind')
      .then((response) => response.json())
      .then((json) => setData(json.response))
      .catch((error) => console.error(error))
      .finally(() => console.log('end /api/wind'));
  }, []);

  navigation.setOptions({ title: roadNm })

  return (
    <MapView 
      style={styles.container}
      initialRegion={{
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {data.map(marker => {
        return <Marker
                coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
                title={"lat:"+marker.latitude+", lon:"+marker.longitude}
                description={"nx:"+marker.nx+", ny:"+marker.ny}
              >
                <Icon name="wind" size={24} color={Colors.black} />
              </Marker>
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
