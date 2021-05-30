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

// function useForceUpdate() {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => value + 1); // update the state to force render
// }
const VRChooseRoomAndDevice = props => {
  // let roomSelect = false;
  // let deviceSelect = false;
  // const [roomSelect, setRoomSelect] = useState(false);
  // const [deviceSelect, setDeviceSelect] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [roomArray, setRoomArray] = useState([]);
  const [deviceArray, setDeviceArray] = useState([]);
  const [roomSelection, setRoomSelection] = useState(
    props.route.params.roomSelect,
  );
  const [deviceSelection, setDeviceSelection] = useState(
    props.route.params.deviceSelect,
  );
  // let rooms = [];
  // let roomArray = [];
  let roomSelect = props.route.params.roomSelect;
  let deviceSelect = props.route.params.deviceSelect;

  useEffect(() => {
    if (props.route.params?.roomList && roomSelect == true) {
      setRooms(props.route.params.roomList);
      roomSelect = true;
      setRoomSelection(true);
      setDevices(props.route.params.roomArray[0].devices);
      setRoomArray(props.route.params.roomArray);
    } else if (props.route.params?.deviceList && deviceSelect == true) {
      setDevices(props.route.params.deviceList);
      deviceSelect = true;
      setDeviceSelection(true);
      setDeviceArray(props.route.params.deviceArray);
    }
  }, [roomSelect, deviceSelect]);
  // if (props.route.params?.roomList) {
  //   rooms = props.route.params.roomList;

  //   roomSelect = true;
  //   devices.push(props.route.params.roomArray[0].devices);
  //   roomArray = props.route.params.roomArray;
  // }
  // if (props.route.params?.deviceList) {
  //   devices = props.route.params.deviceList;
  //   deviceSelect = true;
  //   deviceArray = props.route.params.deviceArray;
  // }

  const selectRoom = props => {
    roomSelect = true;
    props.navigation.navigate('selectRoom', {
      roomArray: roomArray,
    });
  };

  const selectDevices = props => {
    deviceSelect = true;
    props.navigation.navigate('selectDevice', {
      deviceArray: deviceArray,
    });
  };

  const setRoomData = props => {
    if (rooms.length > 0 || devices.length > 0) {
      props.navigation.navigate('vrRooms', {
        deviceArray: devices,
        roomsArray: rooms,
        roomSelect: roomSelect,
        deviceSelect: deviceSelect,
      });
    }
  };
  const deleteRoom = (item, i) => {
    let arr = [...rooms];
    arr = arr.filter(value => value.id !== item.id);
    setRooms(arr);
    let arr2 = [...roomArray];
    arr2[i].highlight = false;
    setRoomArray(arr);
    if (arr.length == 0) {
      roomSelect = false;
      deviceSelect = false;
      setRoomSelection(false);
      setDeviceSelection(false);
    }
  };
  const deleteDevice = (item, i) => {
    let arr = [...devices];
    arr = arr.filter(value => value.id !== item.id);
    setDevices(arr);
    let arr2 = [...deviceArray];
    arr2[i].highlight = false;
    setDeviceArray(arr);
    if (arr.length == 0) {
      roomSelect = false;
      deviceSelect = false;
      setRoomSelection(false);
      setDeviceSelection(false);
    }
  };

  return (
    <View style={styles.container1}>
      <Header
        title="Select Rooms and Devices"
        nav={props.navigation}
        buttonsEnabled={true}
      />
      <View style={styles.container2}>
        <View style={styles.otherboxes}>
          <Text style={{fontWeight: 'bold'}}>Rooms</Text>
          <View>
            {rooms.length < 1 ? (
              <Text
                style={{
                  color: '#B2B7C6',
                  fontSize: 22,
                  fontFamily: 'Roboto',
                }}>
                Select Room
              </Text>
            ) : (
              rooms.map((value, i) => (
                <View key={value.id} style={styles.inline}>
                  <Text
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
                <View key={value.id} style={styles.inline}>
                  <Text
                    style={{
                      color: '#B2B7C6',
                      fontSize: 22,
                      fontFamily: 'Roboto',
                      width: '90%',
                    }}>
                    {value.name}
                  </Text>
                  <Icon
                    name="trash"
                    onPress={() => deleteDevice(value, i)}
                    style={styles.iconStyle}
                  />
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
          disabled={deviceSelection}>
          Select Room
        </Button>

        <Button
          style={styles.button1}
          mode="contained"
          onPress={() => {
            selectDevices(props);
          }}
          disabled={roomSelection}>
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
