import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Platform } from 'react-native';
import Colors from './Colors';
import { FlatGrid } from 'react-native-super-grid';
import { WebView } from 'react-native-webview';

export default function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);

  function dataProcessing(res) {
    if(Platform.OS === 'ios') {
      let filterData = res.filter(function(road) {
        return road.roadNm != 'ads_cpng'
      })
      setData(filterData)
    } else {
      setData(res)
    }
  }
  
  useEffect(() => {
    // 2초 뒤에 api 호출
    setTimeout(() => {
      let url = 'http://118.67.129.162/api/wind/road'
      fetch(url)
        .then((response) => response.json())
        .then((json) => dataProcessing(json.response))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white }}>
    {isLoading ? <Image style={{width: 300, height: 300}} source={require('./images/loading.gif')} /> : (
      <FlatGrid
      itemDimension={130}
      data={data}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        item.roadNm == 'ads_cpng' ? 
        <View style={[styles.itemContainer]}>
          <WebView
              onLayout={(event) => {
                var {x, y, width, height} = event.nativeEvent.layout;
                setWidth(width * (Platform.OS === 'ios' ? 4 : 0.9))
                setHeight(height * (Platform.OS === 'ios' ? 4 : 0.9))
              }}
              style={styles.adsWebView}
              scalesPageToFit={false}
              bounces={false}
              scrollEnabled={false}
              source={{html: '<iframe src="https://ads-partners.coupang.com/widgets.html?id='+item.imageFileName+'&template=carousel&trackingCode=AF4453206&subId=&width='+width+'&height='+height+'" width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" referrerpolicy="unsafe-url"></iframe>'}}
            />
        </View> : 
        <TouchableOpacity 
          style={[styles.itemContainer]}
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
            <Text style={styles.itemName}>
              {item.roadNm.split('/').length > 1 ? item.roadNm.split('/')[0] : item.roadNm}
            </Text>
            <Text style={styles.itemName}>
              {item.roadNm.split('/').length > 1 ? item.roadNm.split('/')[1] : ''}
            </Text>
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
    flex: 1,
    backgroundColor: Colors.white,
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
    color: Colors.black,
    fontWeight: '600',
  },
  preview: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
});