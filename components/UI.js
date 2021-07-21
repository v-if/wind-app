import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import Colors from './Colors';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevPos: null,
      curPos: { latitude: 37.420814, longitude: -122.081949 },
      curAng: 45,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    this.changePosition = this.changePosition.bind(this);
    this.getRotation = this.getRotation.bind(this);
    this.updateMap = this.updateMap.bind(this);
  }

  changePosition(latOffset, lonOffset) {
    const latitude = this.state.curPos.latitude + latOffset;
    const longitude = this.state.curPos.longitude + lonOffset;
    this.setState({
      prevPos: this.state.curPos,
      curPos: { latitude, longitude },
    });
    this.updateMap();
  }

  getRotation(prevPos, curPos) {
    if (!prevPos) {
      return 0;
    }
    const xDiff = curPos.latitude - prevPos.latitude;
    const yDiff = curPos.longitude - prevPos.longitude;
    return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
  }

  updateMap() {
    const { curPos, prevPos, curAng } = this.state;
    const curRot = this.getRotation(prevPos, curPos);
    this.map.animateCamera({ heading: curRot, center: curPos, pitch: curAng });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={el => (this.map = el)}
          style={styles.map}
          minZoomLevel={15}
          initialRegion={{
            ...this.state.curPos,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
        >
        </MapView>
        <TouchableOpacity style={styles.timezone}>
          <Text style={styles.text}>Time zone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonzone}>
          <Text style={styles.text}>Button zone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loadingzone}>
          <Text style={styles.text}>Loading zone</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  timezone: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  buttonzone: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  loadingzone: {
    position: 'absolute',
    top: 300,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

export default Map;