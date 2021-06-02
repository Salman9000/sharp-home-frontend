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

const EditRoom = props => {
  const [name, setName] = useState(props.route.params.roomInfo.name);
  const [desc, setDesc] = useState(props.route.params.roomInfo.desc);
  const [roomId, setRoomId] = useState(props.route.params.roomInfo.id);
  const token = props.token;

  const updateRoom = async props => {
    try {
      const response = await instance(token).patch(`/v1/rooms/${roomId}`, {
        name: name,
        description: desc,
      });
      if (response) {
        alert('Room Updated');
        props.navigation.push('viewRooms');
      }
    } catch (error) {
      console.log(
        'There has been a problem with your fetch operation in enterhouse login: ' +
          error.message,
      );
    }
  };

  const cancelupdateRoom = async props => {
    setName('');
    setDesc('');
    props.navigation.push('viewDevices');
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
              cancelupdateRoom(props);
            }}>
            Cancel
          </Button>
          <Button
            style={styles.button1}
            mode="contained"
            onPress={() => {
              updateRoom(props);
            }}>
            Update
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  button1: {
    width: '40%',
    margin: 20,
    height: 50,
    justifyContent: 'center',
  },
});

export default EditRoom;
