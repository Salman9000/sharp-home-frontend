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
  const [status, setStatus] = useState(props.route.params.deviceInfo.status);
  const [rating, setRating] = useState(
    props.route.params.deviceInfo.powerRating,
  );
  const [room, setRoom] = useState('');
  const [deviceId, setDeviceId] = useState(props.route.params.deviceInfo.id);

  const getRoom = async props => {
    try {
      const response = await instance(token).get(
        `/v1/rooms/${props.route.params.deviceInfo.room}`,
      );
      console.log(response.data);
      setRoom(response.data.name);
    } catch (err) {
      console.log(err);
    }
  };
  const updateDevice = async props => {
    try {
      const response = await instance(token).patch(
        `/v1/devices/info/${deviceId}`,
        {
          name: name,
          powerRating: rating,
        },
      );
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
  const cancelupdateDevice = async props => {
    setRating('');
    setName('');
    props.navigation.push('viewDevices');
  };

  useEffect(() => {
    getRoom(props);
  }, []);

  return (
    <View style={styles.container1}>
      <Header
        title="Edit a Device"
        nav={props.navigation}
        buttonsEnabled={true}
      />
      <View style={styles.container2}>
        <View style={styles.otherboxes}>
          <Card style={styles.card}>
            <CardItem>
              <Text>
                Device ID: {'\n'}
                {deviceId}{' '}
              </Text>
              <Right>
                {status == 'on' ? (
                  <Text style={{color: 'green'}}>{status}</Text>
                ) : (
                  <Text style={{color: 'red'}}>{status}</Text>
                )}
              </Right>
            </CardItem>
          </Card>
          <View style={styles.headingView}>
            <Text style={styles.heading}>Device Name</Text>
          </View>
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
          <View style={styles.headingView}>
            <Text style={styles.heading}>Device Rating (kWh)</Text>
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
          <View style={styles.headingView}>
            <Text style={styles.heading}>Room</Text>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.room}>{room}</Text>
          </View>
        </View>
        <View style={styles.otherboxes2}>
          <Button
            style={styles.button1}
            mode="contained"
            onPress={() => {
              cancelupdateDevice(props);
            }}>
            Cancel
          </Button>
          <Button
            style={styles.button1}
            mode="contained"
            onPress={() => {
              updateDevice(props);
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
  headingView: {
    marginLeft: 32,
  },
  heading1: {
    fontSize: 24,
    marginLeft: 32,
  },
  heading: {
    color: '#606060',
  },
  room: {
    fontSize: 24,
    marginTop: 6,
    color: 'black',
  },
  cardItem: {
    width: wp('90%'),
    height: 120,
  },
  card: {
    marginBottom: 50,
    width: wp('90%'),
    height: 70,
    alignItems: 'center',
    borderRadius: 10,
  },
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
    marginTop: 30,
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
    backgroundColor: '#3F51B5',
  },
  on: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: 'green',
  },
  off: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: 'red',
  },
});
export default EditDevice;
