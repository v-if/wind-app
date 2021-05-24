import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Colors,
  Content,
  WindMap,
  Setting,
  About,
  Feedback,
} from './components';

const Stack = createStackNavigator();

export default class example extends Component {
  componentDidMount() {
    // 1.5초 뒤 Splash 닫기
    setTimeout(() => {
      SplashScreen.hide()
    }, 1200);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Content} 
            options={({ navigation, route }) => ({
              title: '',
              headerStyle: styles.header,
              headerTintColor: Colors.lighter,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerLeft: () => (
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginLeft: 10,
                  }}
                >
                  <Icon name="wind" size={24} color={Colors.lighter} />
                  <Text style={styles.title}>순풍순풍</Text>
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
                    <Icon name="settings" size={24} color={Colors.lighter} />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen 
            name="Map" 
            component={WindMap} 
            options={({ navigation, route }) => ({
              title: '',
              headerStyle: styles.header,
              headerTintColor: Colors.lighter,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          <Stack.Screen 
            name="Setting" 
            component={Setting}
            options={({ navigation, route }) => ({
              headerStyle: styles.header,
              headerTintColor: Colors.lighter,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          <Stack.Screen 
            name="About" 
            component={About}
            options={({ navigation, route }) => ({
              headerStyle: styles.header,
              headerTintColor: Colors.lighter,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          <Stack.Screen 
            name="Feedback" 
            component={Feedback}
            options={({ navigation, route }) => ({
              headerStyle: styles.header,
              headerTintColor: Colors.lighter,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.peter_river,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.lighter,
    marginLeft: 4,
  },
});
