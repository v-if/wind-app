import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  ToastAndroid,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView from './MapView';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import Colors from './Colors';

const { width, height } = Dimensions.get('window');

// https://rnfb-docs.netlify.app/admob/displaying-ads#banner-ads
const unitId =
  Platform.OS === 'ios'
    ? 'ca-app-pub-8932745447223637/4899865781'
    : 'ca-app-pub-8932745447223637/3208931044';

export default function App() {
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [location, setLocation] = useState(null);
  const [isAdsLoaded, setAdsLoaded] = useState(true);

  const watchId = useRef(null);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('순풍순풍앱에서 사용자의 위치를 확인하도록 허용하려면 위치 서비스를 켜십시오.');
    }

    if (status === 'disabled') {
      Alert.alert(
        '순풍순풍앱에서 사용자의 위치를 확인하도록 허용하려면 위치 서비스를 켜십시오.',
        '',
        [
          { text: '확인', onPress: openSetting },
          { text: '취소', onPress: () => {} },
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        '순풍순풍앱에서 사용자의 위치를 확인하도록 허용하려면 위치 서비스를 켜십시오.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        '순풍순풍앱에서 사용자의 위치를 확인하도록 허용하려면 위치 서비스를 켜십시오.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        console.log(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
  };

  useEffect(() => {
    setTimeout(() => {
      // 앱 오픈시 사용자의 위치정보 조회하여 사용자 위치로 이동
      getLocation();
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <View style={ isAdsLoaded == true ? styles.mapWithAds : styles.map }>
        <MapView coords={location?.coords || null} />
      </View>
      {isAdsLoaded == true ?
      <View style={{ width: width, height: 50, backgroundColor: Colors.white, position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
        <BannerAd
          unitId={unitId}
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={function() {
            console.log('Advert loaded');
          }}
          onAdFailedToLoad={function(error) {
            console.log(error);
            setAdsLoaded(false)
          }}
        />
      </View> : <View></View>
      }
      <TouchableOpacity 
        style={styles.hereWrap}
        onPress={getLocation}
      >
        <Image style={{width: 34, height: 34}} source={require('./images/precision.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mapWithAds: {
    ...StyleSheet.absoluteFillObject,
    marginBottom: 50,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  hereWrap: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    opacity: 0.9,
    position: 'absolute',
    top: 0,
    margin: 10,
    padding: 4,
  },
});