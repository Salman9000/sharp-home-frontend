/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
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
  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      setToken(value);
    });
  }, []);

  console.log(token);

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
    // <View style={[t.flex1, t.bgGray200]}>

    //  {/* <Header /> */}
    // {/* <Login /> */}
    // {/*<AddItem addItem={addItem} />
    // <FlatList
    //   numColumns={3}
    //   data={items}
    //   renderItem={({item}) => (
    //     <ListItem deleteItem={deleteItem} item={item} />
    //   )}
    // /> */}
    // </View>
  );
};

export default App;
