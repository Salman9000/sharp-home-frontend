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
import HomeScreen from './component/HomeScreen';
import ChartOne from './component/Chartone';
import NoRoom from './component/NoRoom';
import AddRoom from './component/AddRoom';
import NoDevice from './component/NoDevice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddDevice from './component/AddDevice';
import ChooseRoom from './component/ChooseRoom';

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
            <Stack.Screen name="Signup">
              {props => <Signup {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="Login">
              {props => <Login {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="Chartone">
              {props => <ChartOne {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="noRoom">
              {props => <NoRoom {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="noDevice">
              {props => <NoDevice {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="addRoom">
              {props => <AddRoom {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="addDevice">
              {props => <AddDevice {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="chooseRoom">
              {props => <ChooseRoom {...props} token={token} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
};

export default App;
