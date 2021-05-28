import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Colors from './Colors';
import { FlatGrid } from 'react-native-super-grid';

export default function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://118.67.129.162/api/wind/road')
      .then((response) => response.json())
      .then((json) => setData(json.response))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
    {isLoading ? <ActivityIndicator style={{ flex: 1 }}/> : (
      <FlatGrid
        itemDimension={130}
        data={data}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.itemContainer, { backgroundColor: Colors.clouds }]}
            onPress={() => navigation.navigate('Map', {
              road: item.road,
              roadNm: item.roadNm,
              latitude: item.latitude,
              longitude: item.longitude
            })}
          >
            <Text style={styles.itemName}>{item.roadNm}</Text>
          </TouchableOpacity>
        )}
      />
    )}
  </View>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 200,
  },
  itemName: {
    fontSize: 16,
    color: Colors.peter_river,
    fontWeight: '600',
  },
});