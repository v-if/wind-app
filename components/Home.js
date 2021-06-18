import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import Colors from './Colors';
import { FlatGrid } from 'react-native-super-grid';
import { WebView } from 'react-native-webview';

export default function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);

  useEffect(() => {
    let url = 'http://118.67.129.162/api/wind/road'
    fetch(url)
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
          item.roadNm == 'ads_cpng' ? 
          <View style={[styles.itemContainer, { backgroundColor: Colors.clouds }]}>
            <WebView
              onLayout={(event) => {
                var {x, y, width, height} = event.nativeEvent.layout;
                setWidth(width*0.9)
                setHeight(height*0.9)
              }}
              style={styles.adsWebView}
              //showsHorizontalScrollIndicator={false}
              //showsVerticalScrollIndicator={false}
              //automaticallyAdjustContentInsets={false}
              //scrollEnabled={false}
              scalesPageToFit={false}
              bounces={false}
              scrollEnabled={false}
              source={{html: '<iframe src="https://ads-partners.coupang.com/widgets.html?id='+item.imageFileName+'&template=carousel&trackingCode=AF4453206&subId=&width='+width+'&height='+height+'" width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" referrerpolicy="unsafe-url"></iframe>'}}
            />
          </View> :
          <TouchableOpacity 
            style={[styles.itemContainer, { backgroundColor: Colors.clouds }]}
            onPress={() => navigation.navigate('Map', {
              road: item.road,
              roadNm: item.roadNm,
              latitude: item.latitude,
              longitude: item.longitude,
            })}
          >
            <View style={styles.item}>
              <Image
                style={styles.preview}
                source={{ uri: "http://118.67.129.162/images/" + item.road }}
              />
              <Text style={styles.itemName}>{item.roadNm}</Text>
            </View>
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
  adsContainer: {
    borderRadius: 5,
    padding: 10,
    height: 200,
    backgroundColor: Colors.black,
  },
  adsWebView: {
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    padding: 10,
    height: 200,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    color: Colors.peter_river,
    fontWeight: '600',
  },
  preview: {
    width: 150,
    height: 150,
    backgroundColor: Colors.silver,
  },
});