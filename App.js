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
import AddDevice2 from './component/AddDevice2';
import ChooseRoom from './component/ChooseRoom';
import ConfirmDeviceDetails from './component/ConfirmDeviceDetails';
import ViewDevices from './component/ViewDevices';
import VRChooseRoomAndDevice from './component/VRChooseRoomAndDevice';
import SelectRoom from './component/SelectRoom';
import SelectDevices from './component/SelectDevices';
import VRrooms from './component/VRrooms';
import NetworkDiscoverer from './component/NetworkDiscoverer';
import ChooseDate from './component/ChooseDate';
const Stack = createStackNavigator();

const App = () => {
  // AsyncStorage.clear().then(console.log('cleared'));
  const [token, setToken] = useState(null);
  const [TokenSet, isTokenSet] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      setToken(value);
      isTokenSet(true);
    });
  }, []);
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
            <Stack.Screen name="Signup">
              {props => <Signup {...props} setToken={setToken} />}
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
              {props => <Signup {...props} setToken={setToken} />}
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
            {/* <Stack.Screen name="addDevice2">
              {props => <AddDevice2 {...props} token={token} />}
            </Stack.Screen> */}
            <Stack.Screen name="deviceDiscover">
              {props => <NetworkDiscoverer {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="chooseRoom">
              {props => <ChooseRoom {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="confirmDeviceDetails">
              {props => <ConfirmDeviceDetails {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="viewDevices">
              {props => <ViewDevices {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="vrChooseRoomAndDevice">
              {props => <VRChooseRoomAndDevice {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="selectRoom">
              {props => <SelectRoom {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="selectDevice">
              {props => <SelectDevices {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="vrRooms">
              {props => <VRrooms {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="chooseDate">
              {props => <ChooseDate {...props} token={token} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
};

export default App;
