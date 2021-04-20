/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {t} from 'react-native-tailwindcss';
import 'react-native-gesture-handler';

// import Header from './component/Header';
// import {v4 as uuidv4} from 'uuid';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Alert,
} from 'react-native';

import Header from './component/Header';
import ListItem from './component/ListItem';
import AddItem from './component/AddItem';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from './component/Signup';
import Login from './component/Login';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
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
