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
import instance from '../helper';
import {BASE_URL} from '@env';

const AddRoom = props => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const token = props.token;

  const addRoom = async props => {
    // console.log('pressed');
    // const token = await validToken();
    // console.log('hello');
    try {
      const response = await instance(token).post(`/v1/rooms`, {
        name: name,
        description: desc,
      });

      props.navigation.push('chooseRoom', {
        deviceName: props.deviceName,
        deviceRating: props.deviceRating,
      });
      //   console.log(response);
    } catch (error) {
      console.log('addRoom in AddRoom ' + error);
    }
  };

  return (
    <View style={styles.container1}>
      <Header title="Add a Room" nav={props.navigation} buttonsEnabled={true} />
      <View style={styles.container2}>
        <View style={styles.otherboxes}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={name}
              placeholder="Name"
              selectionColor="black"
              placeholderTextColor="#AAA"
              underlineColorAndroid="#D2D6DE"
              onChangeText={name => setName(name)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={desc}
              placeholder="Description"
              selectionColor="black"
              placeholderTextColor="#AAA"
              underlineColorAndroid="#D2D6DE"
              onChangeText={desc => setDesc(desc)}
            />
          </View>
        </View>
        <View style={styles.otherboxes2}>
          <Button
            style={styles.button1}
            mode="contained"
            onPress={() => {
              addRoom(props);
            }}>
            Add Room
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

export default AddRoom;
