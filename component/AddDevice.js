import React from 'react';
import {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
import DropDownPicker from 'react-native-dropdown-picker';

const AddDevice = props => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');

  const validToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      //   console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  const chooseRoom = props => {
    if (name.length === 0 || rating.length === 0) {
      alert('Name and Rating are compulsory!');
    } else {
      props.navigation.navigate('chooseRoom', {
        deviceName: name,
        deviceRating: rating,
      });
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
      <Header title="Add a Device" />
      <View style={styles.container2}>
        <View style={styles.otherboxes}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={name}
              placeholder="Name"
              selectionColor="white"
              placeholderTextColor="#ffffff"
              onChangeText={name => setName(name)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={rating}
              placeholder="Power Rating in kWh"
              placeholderTextColor="#ffffff"
              onChangeText={rating => setRating(rating)}
            />
          </View>
        </View>
        <View style={styles.otherboxes2}>
          <Button
            style={styles.button1}
            mode="contained"
            onPress={() => {
              chooseRoom(props);
            }}>
            Choose Room
          </Button>
        </View>
      </View>
      <Footer nav={props} />
    </View>
  );
};

export default AddDevice;
