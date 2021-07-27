import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';
import {
  Colors,
  Home,
  Setting,
  About,
  Feedback,
  Library,
  Map,
  IconInformation,
} from './components';

const Stack = createStackNavigator();

export default function App() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  // 0.5초 뒤 Splash 닫기
  setTimeout(() => {
    SplashScreen.hide()
  }, 500);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={async () => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name

        if (previousRouteName !== currentRouteName) {
          // https://rnfirebase.io/analytics/usage

          // Predefined Events
          //   await analytics().logScreenView({
          //     screen_class: currentRouteName,
          //     screen_name: currentRouteName,
          //   });
          
          // Custom Events 
          await analytics().logEvent('current_screen', {
            screen_name: currentRouteName,
          })
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: styles.header,
            headerTintColor: Colors.black,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <View style={{
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: "flex-end",
                marginLeft: 10,
                }}
              >
                <Image
                  style={{width: 135, height: 34}}
                  source={require('./components/images/home.jpg')}
                />
              </View>
            ),
            headerRight: () => (
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate('Setting')}
                  >
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('./components/images/crankset.png')}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen 
          name="Setting" 
          component={Setting}
          options={({ navigation, route }) => ({
            title: 'Setting',
            headerStyle: styles.header,
            headerTintColor: Colors.black,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen 
          name="Map" 
          component={Map} 
          options={({ navigation, route }) => ({
            title: '',
            headerStyle: styles.header,
            headerTintColor: Colors.black,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate('IconInformation')}
                  >
                  <Image
                    style={{width: 28, height: 28}}
                    source={require('./components/images/information.png')}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen 
          name="IconInformation" 
          component={IconInformation}
          options={({ navigation, route }) => ({
            title: '바람/날씨기호 설명',
            headerStyle: styles.header,
            headerTintColor: Colors.black,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen 
          name="About" 
          component={About}
          options={({ navigation, route }) => ({
            title: 'About',
            headerStyle: styles.header,
            headerTintColor: Colors.black,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen 
          name="Feedback" 
          component={Feedback}
          options={({ navigation, route }) => ({
            title: '피드백 보내기',
            headerStyle: styles.header,
            headerTintColor: Colors.black,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen 
          name="Library" 
          component={Library}
          options={({ navigation, route }) => ({
            title: '사용 라이브러리',
            headerStyle: styles.header,
            headerTintColor: Colors.black,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: 4,
  },
});
