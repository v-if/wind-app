import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';

export default function AppStore({ navigation }) {
  // https://play.google.com/store/apps/details?id=com.studiobustle.bookjuk&hl=ko&gl=US

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator style={{ flex: 1 }}/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.releaseYear}</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});