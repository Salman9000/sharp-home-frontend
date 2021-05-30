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
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
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
import CustomRoomChart from './component/CustomRoomChart';
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
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen name="Login">
              {props => (
                <Login
                  {...props}
                  setToken={setToken}
                  options={{title: 'Login'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {props => (
                <Signup
                  {...props}
                  setToken={setToken}
                  options={{title: 'Sign Up'}}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            {/* <Stack.Screen name="loading" component={LoadingScreen} /> */}
            <Stack.Screen name="home">
              {props => (
                <HomeScreen
                  {...props}
                  token={token}
                  options={{title: 'Home'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {props => (
                <Signup
                  {...props}
                  setToken={setToken}
                  options={{title: 'Sign Up'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Login">
              {props => (
                <Login
                  {...props}
                  setToken={setToken}
                  options={{title: 'Login'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Chartone">
              {props => <ChartOne {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="noRoom">
              {props => (
                <NoRoom {...props} token={token} options={{title: 'Rooms'}} />
              )}
            </Stack.Screen>
            <Stack.Screen name="noDevice">
              {props => (
                <NoDevice
                  {...props}
                  token={token}
                  options={{title: 'Devices'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="addRoom">
              {props => (
                <AddRoom
                  {...props}
                  token={token}
                  options={{title: 'Add a Room'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="addDevice">
              {props => (
                <AddDevice
                  {...props}
                  token={token}
                  options={{title: 'Add a Device'}}
                />
              )}
            </Stack.Screen>
            {/* <Stack.Screen name="addDevice2">
              {props => <AddDevice2 {...props} token={token} />}
            </Stack.Screen> */}
            <Stack.Screen name="deviceDiscover">
              {props => (
                <NetworkDiscoverer
                  {...props}
                  token={token}
                  options={{title: 'Scanning For Devices'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="chooseRoom">
              {props => (
                <ChooseRoom
                  {...props}
                  token={token}
                  options={{title: 'Choose A Room'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="confirmDeviceDetails">
              {props => (
                <ConfirmDeviceDetails
                  {...props}
                  token={token}
                  options={{title: 'Confirm Device Details'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="viewDevices">
              {props => (
                <ViewDevices
                  {...props}
                  token={token}
                  options={{title: 'All Devices'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="vrChooseRoomAndDevice">
              {props => (
                <VRChooseRoomAndDevice
                  {...props}
                  token={token}
                  options={{title: 'Select Rooms and Devices'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="selectRoom">
              {props => (
                <SelectRoom
                  {...props}
                  token={token}
                  options={{title: 'Select Rooms'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="selectDevice">
              {props => (
                <SelectDevices
                  {...props}
                  token={token}
                  options={{title: 'Select Devices'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="vrRooms">
              {props => (
                <VRrooms
                  {...props}
                  token={token}
                  options={{title: 'Room Report'}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="chooseDate">
              {props => (
                <ChooseDate
                  {...props}
                  token={token}
                  options={{title: 'Choose Dates'}}
                />
              )}
            </Stack.Screen>
            {/* <Stack.Screen name="customRoomChart">
              {props => <CustomRoomChart {...props} token={token} />}
            </Stack.Screen> */}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
};

export default App;
