import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import Colors from './Colors';

class Map extends Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.item1}>
              <Text>1</Text>
          </View>
          <View style={styles.item2}>
              <Text>2</Text>
          </View>
          <View style={styles.item3}>
              <Text>3</Text>
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection:'column',
    alignItems:'flex-start',
  },
  item1: {
    width: 50,
    height: 50,
    backgroundColor: Colors.alizarin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item2: {
    width: 50,
    height: 50,
    backgroundColor: Colors.sun_flower,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item3: {
    width: 50,
    height: 50,
    backgroundColor: Colors.green_sea,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Map;