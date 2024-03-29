import React, { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, Text, View, StyleSheet, Platform, Linking  } from 'react-native';
import Colors from './Colors';

function goToStore() {
  console.log('Go to AppStore:'+Platform.OS)
  if(Platform.OS === 'ios') {
    Linking.openURL('itms-apps://itunes.apple.com/us/app/id1577293912')
  } else if(Platform.OS === 'android') {
    Linking.openURL("market://details?id=com.tkpark.wind");
  }
}

export default function Setting({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'About', title: 'About'},
          {key: 'Feedback', title: '피드백 보내기'},
          {key: 'AppStore', title: '앱 평점주기 / 리뷰'},
          {key: 'Library', title: '사용 라이브러리'},
        ]}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => item.key == 'AppStore' ? goToStore() : navigation.navigate(item.key)}>
          <Text style={styles.item}>{item.title}</Text>
        </TouchableOpacity>
      }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },
});