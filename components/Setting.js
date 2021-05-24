import React, { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, Text, View, StyleSheet } from 'react-native';

export default function Setting({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'About', title: 'About'},
          {key: 'Feedback', title: '피드백 보내기'},
          {key: 'Dominic', title: '앱 평점주기 / 리뷰'},
          {key: 'Jackson', title: '개발자 소개'},
          {key: 'James', title: '사용 라이브러리'},
        ]}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => navigation.navigate(item.key)}>
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
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },
});