/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {t} from 'react-native-tailwindcss';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from './component/Signup';
import Login from './component/Login';
import LoadingScreen from './component/LoadingScreen';
import HomeScreen from './component/HomeScreen';
import ChartOne from './component/Chartone';
import noRoom from './component/NoRoom';
import addRoom from './component/AddRoom';
import noDevice from './component/NoDevice';
import addDevice from './component/AddDevice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

const App = () => {
  // AsyncStorage.clear().then(console.log('cleared'));
  const [token, setToken] = useState(null);
  const [TokenSet, isTokenSet] = useState(false);
  const getToken = () => {
    AsyncStorage.getItem('token').then(value => {
      setToken(value);
      isTokenSet(true);
    });
  };

  // useEffect(() => {
  //   getToken();
  // }, [TokenSet]);
  getToken();
  console.log(token, 'token value');
  console.log(TokenSet, 'token boolean');
  if (!TokenSet) {
    return null;
  } else {
    return (
      <NavigationContainer>
        {token == null ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login">
              {props => <Login {...props} setToken={setToken} />}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {/* <Stack.Screen name="loading" component={LoadingScreen} /> */}
            <Stack.Screen name="home">
              {props => <HomeScreen {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login">
              {props => <Login {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="Chartone" component={ChartOne} />
            <Stack.Screen name="noRoom" component={noRoom} />
            <Stack.Screen name="noDevice" component={noDevice} />
            <Stack.Screen name="addRoom" component={addRoom} />
            <Stack.Screen name="addDevice" component={addDevice} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
};

export default App;
