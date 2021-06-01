import React from 'react';
import {useState, setState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button, TextInput} from 'react-native-paper';
const axios = require('axios');
import {Card, CardItem, Body, Text, Left, Right, Icon} from 'native-base';
import {BASE_URL} from '@env';
import instance from '../helper';

const EditDevice = props => {
  const token = props.token;
  const [name, setName] = useState(props.route.params.deviceInfo.name);
  const [rating, setRating] = useState(
    props.route.params.deviceInfo.powerRating,
  );
  const [deviceId, setDeviceId] = useState(props.route.params.deviceInfo.id);

  const updateDevice = async props => {
    try {
      const response = await instance(token).patch(`/v1/devices/${deviceId}`, {
        name: name,
        powerRating: rating,
      });
      if (response) {
        alert('Device Updated');
        props.navigation.push('viewDevices');
      }
    } catch (error) {
      console.log(
        'There has been a problem with your fetch operation in enterhouse login: ' +
          error.message,
      );
    }
  };
  const deleteDevice = async props => {
    try {
      //   alert('Do you want to delete the Device');
      const response = await instance(token).delete(`/v1/devices/${deviceId}`);
      if (response) {
        props.navigation.push('viewDevices');
      }
    } catch (error) {
      console.log(
        'There has been a problem with your fetch operation in enterhouse login: ' +
          error.message,
      );
    }
  };
  return (
    <View style={styles.container1}>
      <Header
        title="Edit a Device"
        nav={props.navigation}
        buttonsEnabled={true}
      />
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
              value={rating.toString()}
              placeholder="Rating in Watts"
              selectionColor="white"
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
              updateDevice(props);
            }}>
            Update
          </Button>
          <Button
            style={styles.button1}
            mode="contained"
            onPress={() => {
              deleteDevice(props);
            }}>
            Delete
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
    flexDirection: 'row',
    // alignItems: 'center',
  },
  button1: {
    width: '40%',
    margin: 20,
    height: 50,
    justifyContent: 'center',
  },
});
export default EditDevice;
