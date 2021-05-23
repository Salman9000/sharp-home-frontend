import React from 'react';
import {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
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

const VRChooseRoomAndDevice = props => {
  let roomSelect = false;
  let deviceSelect = false;
  rooms = [];
  roomArray = [];
  // roomList = [];

  devices = [];
  deviceArray = [];
  // deviceArray2 = [];

  if (props.route.params?.roomList) {
    rooms = props.route.params.roomList;
    roomSelect = true;
    devices.push(props.route.params.roomArray[0].devices);
    roomArray = props.route.params.roomArray;
  }
  if (props.route.params?.deviceName) {
    devices.push({
      name: props.route.params.deviceName,
      id: props.route.params.deviceId,
    });
    deviceSelect = true;
    console.log(devices);
    deviceArray = props.route.params.deviceArray;
  }

  const selectRoom = props => {
    props.navigation.navigate('selectRoom', {
      roomArray: roomArray,
    });
  };

  const selectDevices = props => {
    props.navigation.navigate('selectDevice', {
      deviceArray: deviceArray,
    });
  };

  const setRoomData = props => {
    console.log(devices, 'kkjh');
    props.navigation.navigate('vrRooms', {
      deviceArray: devices,
      roomsArray: rooms,
      roomSelect: roomSelect,
      deviceSelect: deviceSelect,
    });
  };

  return (
    <View style={styles.container1}>
      <Header title="Select rooms and devices" />
      <View style={styles.container2}>
        <View style={styles.otherboxes}>
          <Text style={{fontWeight: 'bold'}}>Rooms</Text>
          <View>
            {rooms.length < 1 ? (
              <Text
                style={{color: '#B2B7C6', fontSize: 22, fontFamily: 'Roboto'}}>
                Select Room
              </Text>
            ) : (
              rooms.map((value, i) => (
                <Text
                  key={i}
                  style={{
                    color: '#B2B7C6',
                    fontSize: 22,
                    fontFamily: 'Roboto',
                  }}>
                  {value.name}
                </Text>
              ))
            )}
          </View>
        </View>
        <View style={styles.otherboxes}>
          <Text style={{fontWeight: 'bold'}}>Devices</Text>
          <View>
            {devices.length < 1 ? (
              <Text
                style={{color: '#B2B7C6', fontSize: 22, fontFamily: 'Roboto'}}>
                Select Devices
              </Text>
            ) : roomSelect ? (
              <Text
                style={{color: '#B2B7C6', fontSize: 22, fontFamily: 'Roboto'}}>
                All Devices are Selected
              </Text>
            ) : (
              devices.map((value, i) => (
                <Text
                  key={i}
                  style={{
                    color: '#B2B7C6',
                    fontSize: 22,
                    fontFamily: 'Roboto',
                  }}>
                  {value.name}
                </Text>
              ))
            )}
          </View>
        </View>
        <Button
          style={styles.button1}
          mode="contained"
          onPress={() => {
            selectRoom(props);
          }}
          disabled={deviceSelect}>
          Select Room
        </Button>

        <Button
          style={styles.button1}
          mode="contained"
          onPress={() => {
            selectDevices(props);
          }}
          disabled={roomSelect}>
          Select Devices
        </Button>

        <Button
          style={styles.button1}
          mode="contained"
          onPress={() => {
            setRoomData(props);
          }}>
          Save
        </Button>
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
    marginTop: 50,
    alignItems: 'center',
  },
  inputView: {
    // backgroundColor: 'white',
    width: wp('90%'),
    height: 50,
    marginBottom: 20,
    // alignItems: 'center',
  },
  otherboxes: {
    // height: hp('50%'),
    backgroundColor: 'white',
    // width: wp('100%'),
    marginHorizontal: 30,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 30,
    width: wp('90%'),
    marginBottom: 30,
    flexDirection: 'column',
    alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  otherboxes2: {
    // height: hp('50%'),
    width: wp('90%'),
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  button1: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 30,
  },
});
export default VRChooseRoomAndDevice;
