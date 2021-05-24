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
import {Button as Button2, Icon} from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';

const VRChooseRoomAndDevice = props => {
  let roomSelect = false;
  let deviceSelect = false;
  const [roomList, setRoomList] = useState([]);
  let rooms = [];
  let roomArray = [];
  // roomList = [];

  let devices = [];
  let deviceArray = [];
  // deviceArray2 = [];
  useEffect(() => {
    if (props.route.params?.roomList) {
      rooms = props.route.params.roomList;
      setRoomList(props.route.params.roomList);
      roomSelect = true;
      devices.push(props.route.params.roomArray[0].devices);
      roomArray = props.route.params.roomArray;
      console.log(roomList, 'room2');
    }
    if (props.route.params?.deviceList) {
      devices = props.route.params.deviceList;
      deviceSelect = true;
      console.log(devices);
      deviceArray = props.route.params.deviceArray;
    }
  }, []);
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
  const deleteRoom = (item, i) => {
    // let arr = [...rooms];
    // // arr[i].highlight = false;
    // // setRooms(arr);
    console.log(item);
    rooms = rooms.filter(value => value.id !== item.id);
    console.log(rooms, 'seconf');
    setRoomList(rooms);
  };

  return (
    <View style={styles.container1}>
      <Header title="Select rooms and devices" />
      <View style={styles.container2}>
        <View style={styles.otherboxes}>
          <Text style={{fontWeight: 'bold'}}>Rooms</Text>
          <View>
            {roomList.length < 1 ? (
              <Text
                style={{
                  color: '#B2B7C6',
                  fontSize: 22,
                  fontFamily: 'Roboto',
                }}>
                Select Room
              </Text>
            ) : (
              roomList.map((value, i) => (
                <View style={styles.inline}>
                  <Text
                    key={i}
                    style={{
                      color: '#B2B7C6',
                      fontSize: 22,
                      fontFamily: 'Roboto',
                      width: '80%',
                    }}>
                    {value.name}
                  </Text>
                  {/* <Button2
                    transparent
                    iconRight
                    style={{backgroundColor: 'red'}}> */}
                  <Icon
                    name="trash"
                    onPress={() => deleteRoom(value, i)}
                    style={styles.iconStyle}
                  />
                  {/* </Button2> */}
                </View>
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
                <View style={styles.inline}>
                  <Text
                    key={i}
                    style={{
                      color: '#B2B7C6',
                      fontSize: 22,
                      fontFamily: 'Roboto',
                      width: '90%',
                    }}>
                    {value.name}
                  </Text>
                  <Icon name="trash" style={styles.iconStyle} />
                </View>
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
  inline: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  iconStyle: {
    color: 'black',
    // marginTop: 0,
    // padding: 0,
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
