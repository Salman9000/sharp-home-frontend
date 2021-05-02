import React from 'react';
import {useState, setState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');

const ChooseRoom = props => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const validToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      //   console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  const addRoom = async props => {
    console.log('pressed');
    const token = await validToken();
    // console.log('hello');
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //   console.log(config.headers.Authorization);
      const response = await axios.post(
        'http://192.168.1.122:3000/v1/rooms',
        {
          name: name,
          description: desc,
        },
        config,
      );
      props.navigation.replace('home');
      //   console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
    container1: {
      flex: 1,
    },
    container2: {
      flex: 1,
      alignItems: 'center',
    },
    inputView: {
      backgroundColor: '#003f5c',
      width: wp('90%'),
      height: 50,
      marginBottom: 20,
      alignItems: 'center',
    },
    TextInput: {
      height: 50,
      width: wp('90%'),
      flex: 1,
      fontSize: 20,
      alignItems: 'flex-start',
      paddingLeft: 20,
    },
    otherboxes: {
      height: hp('50%'),
      width: wp('90%'),
      marginTop: 50,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    otherboxes2: {
      height: hp('20%'),
      width: wp('100%'),
      flexDirection: 'column',
      alignItems: 'center',
    },
    button1: {
      width: '80%',
      height: 50,
      justifyContent: 'center',
      backgroundColor: 'green',
    },
  });

  return (
    <View style={styles.container1}>
      <Header title="Choose a Room" />
      <View style={styles.container2}>Choose Room</View>
      <Footer nav={props} />
    </View>
  );
};

export default ChooseRoom;
