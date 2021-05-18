import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {Button, Text, Icon} from 'native-base';
import {BASE_URL} from '@env';
import instance from '../helper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';

const ConfirmDeviceDetails = props => {
  const token = props.token;
  const {deviceName, deviceRating, roomId, host, name} = props.route.params;
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    getRoom(roomId);
  }, []);

  const getRoom = async roomId => {
    try {
      const response = await instance(token).get(`/v1/rooms/${roomId}`);
      console.log(response.data);
      setRoomName(response.data.name);
    } catch (err) {
      console.log('err in getroom confirm dev ' + err);
    }
  };
  const confirmButtonPressed = props => {
    addDevice(); // props.navigation.replace('addRoom');
  };

  const addDevice = async props => {
    try {
      const response = await instance(token).post(`/v1/devices`, {
        name: deviceName,
        powerRating: deviceRating,
        room: roomId,
        host: host,
      });
      alert('room added');
      console.log(response.data);
      props.navigation.navigate('home');
    } catch (error) {
      console.log('adddevice in confirmDevice ' + error);
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
    otherboxes: {
      height: hp('50%'),
      width: wp('90%'),
      marginTop: 50,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    inputView: {
      // backgroundColor: 'white',
      width: wp('90%'),
      height: 50,
      marginBottom: 20,
      alignItems: 'center',
    },
    txt: {
      fontSize: 48,
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
  return (
    <View style={styles.container1}>
      <Header title="Confirm Room" />
      <View style={styles.container2}>
        <View style={styles.otherboxes}>
          <View style={styles.inputView}>
            <Text styles={styles.txt}>Device Name: {deviceName}</Text>
          </View>
          <View style={styles.inputView}>
            <Text styles={styles.txt}>Device Rating: {deviceRating}</Text>
          </View>
          <View style={styles.inputView}>
            <Text styles={styles.txt}>Room Name: {roomName}</Text>
          </View>
          <View style={styles.inputView}>
            <Text styles={styles.txt}>Device Ip: {host}</Text>
          </View>
          <View style={styles.otherboxes2}>
            <Button
              style={styles.button1}
              mode="contained"
              onPress={() => {
                addDevice(props);
              }}>
              <Text>Add Device</Text>
            </Button>
          </View>
        </View>
      </View>
      <Footer nav={props} />
    </View>
  );
};

export default ConfirmDeviceDetails;

// import React from 'react';
// import {useState, useEffect} from 'react';
// import {View, StyleSheet} from 'react-native';
// import Header from './Header';
// import Footer from './Footer';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {Button, TextInput} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const axios = require('axios');
// import DropDownPicker from 'react-native-dropdown-picker';

// const AddDevice = props => {
//   const [name, setName] = useState('');
//   const [rating, setRating] = useState('');

//   const chooseRoom = props => {
//     if (name.length === 0 || rating.length === 0) {
//       alert('Name and Rating are compulsory!');
//     } else {
//       props.navigation.navigate('chooseRoom', {
//         deviceName: name,
//         deviceRating: rating,
//       });
//     }
//   };

//   return (
//     <View style={styles.container1}>
//       <Header title="Add a Device" />
//       <View style={styles.container2}>
//         <View style={styles.otherboxes}>
//           <View style={styles.inputView}>
//             <TextInput
//               style={styles.TextInput}
//               value={name}
//               placeholder="Device Name"
//               selectionColor="black"
//               placeholderTextColor="#AAA"
//               underlineColorAndroid="#D2D6DE"
//               onChangeText={name => setName(name)}
//             />
//           </View>
//           <View style={styles.inputView}>
//             <TextInput
//               style={styles.TextInput}
//               value={rating}
//               placeholder="Rating in Watts"
//               selectionColor="black"
//               placeholderTextColor="#AAA"
//               underlineColorAndroid="#D2D6DE"
//               onChangeText={rating => setRating(rating)}
//             />
//           </View>
//         </View>
//         <View style={styles.otherboxes2}>
//           <Button
//             style={styles.button1}
//             mode="contained"
//             onPress={() => {
//               chooseRoom(props);
//             }}>
//             Choose Room
//           </Button>
//         </View>
//       </View>
//       <Footer nav={props} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container1: {
//     flex: 1,
//     backgroundColor: '#F4F5F8',
//   },
//   container2: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   inputView: {
//     // backgroundColor: 'white',
//     width: wp('90%'),
//     height: 50,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   TextInput: {
//     height: 50,
//     width: wp('90%'),
//     flex: 1,
//     fontSize: 18,
//     alignItems: 'flex-start',
//     paddingLeft: 20,
//     color: 'black',
//     backgroundColor: '#F4F5F8',
//   },
//   otherboxes: {
//     height: hp('50%'),
//     width: wp('90%'),
//     marginTop: 50,
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//   },
//   otherboxes2: {
//     height: hp('20%'),
//     width: wp('100%'),
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   button1: {
//     width: '80%',
//     height: 50,
//     justifyContent: 'center',
//   },
// });
// export default AddDevice;
