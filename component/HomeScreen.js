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
  const [devices, setDevices] = useState([]);

  const validToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  const getRooms = async props => {
    const token = await validToken();
    if (token === null) {
      props.navigation.replace('Login');
    }
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        'http://192.168.18.6:3000/v1/rooms',
        config,
      );
      setRooms(response.data.docs);
      if (response.data.docs.length === 0) {
        props.navigation.replace('noRoom');
      }
      return 1;
    } catch (error) {
      console.log(error);
    }
  };

  const getDevices = async props => {
    const token = await validToken();
    if (token === null) {
      props.navigation.replace('Login');
    }
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        'http://192.168.1.122:3000/v1/devices',
        config,
      );
      setDevices(response.data.docs);
      if (response.data.docs.length === 0) {
        props.navigation.replace('noDevice');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms(props).then(getDevices(props));
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
