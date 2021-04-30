import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Storage from './Storage';
import Header from './Header';
import Footer from './Footer';
import {getActionFromState} from '@react-navigation/core';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = props => {
  const [rooms, setRooms] = useState([]);

  const validToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      // console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  const getRooms = async props => {
    const token = await validToken();
    // console.log('hello');
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // console.log(config.headers.Authorization);
      const response = await axios.get(
        'http://192.168.1.122:3000/v1/rooms',
        config,
      );
      // console.log(response.data.docs);
      setRooms(response.data.docs);
      if (rooms) {
        // console.log('exists');
        props.navigation.replace('noRoom');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms(props);
  }, []);

  const addDeviceButton = () => {};
  return (
    <View style={styles.scroll}>
      <Header title="Welcome" />
      {rooms.map(item => (
        <Text key={item.id}>desc: {item.description}</Text>
      ))}
      <ScrollView>
        {/* <TouchableOpacity
          onPress={() => {
            addDeviceButton();
          }}
          style={styles.addDeviceButton}>
          <Text>I'm a button</Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
          onPress={() => logout(props)}>
          logout
        </Button> */}
      </ScrollView>
      <Footer nav={props} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  addDeviceButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 80,
    backgroundColor: 'lightblue',
  },
  scroll: {
    flex: 1,
  },
});
