import React from 'react';
import {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
import DropDownPicker from 'react-native-dropdown-picker';

const AddDevice = props => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');

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

  return (
    <View style={styles.container1}>
      <Header title="Add a Device" />
      <View style={styles.container2}>
        <View style={styles.otherboxes}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={name}
              placeholder="Device Name"
              selectionColor="black"
              placeholderTextColor="#AAA"
              underlineColorAndroid="#D2D6DE"
              onChangeText={name => setName(name)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={rating}
              placeholder="Rating in Watts"
              selectionColor="black"
              placeholderTextColor="#AAA"
              underlineColorAndroid="#D2D6DE"
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

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#F4F5F8',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
  },
  inputView: {
    // backgroundColor: 'white',
    width: wp('90%'),
    height: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    width: wp('90%'),
    flex: 1,
    fontSize: 18,
    alignItems: 'flex-start',
    paddingLeft: 20,
    color: 'black',
    backgroundColor: '#F4F5F8',
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
  },
});
export default AddDevice;
