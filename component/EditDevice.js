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
import DatePicker from 'react-native-date-picker';
import {createIconSetFromFontello} from 'react-native-vector-icons';
var moment = require('moment');
const EditDevice = props => {
  const token = props.token;
  const [name, setName] = useState(props.route.params.deviceInfo.name);
  const [status, setStatus] = useState(props.route.params.deviceInfo.status);
  const [rating, setRating] = useState(
    props.route.params.deviceInfo.powerRating,
  );
  const [room, setRoom] = useState('');
  const [roomId, setRoomId] = useState();
  // const [roomId,setRoomId]= useState()
  const [deviceId, setDeviceId] = useState(props.route.params.deviceInfo._id);
  const [date, setDate] = useState(props.route.params.deviceInfo.range);

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
          range: date,
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
    console.log(props.route.params.deviceInfo, 'viewDevices');
    getRoom(props);
  }, []);

  const changeStartTime = (text, index) => {
    //  olddate = date;
    console.log(date);
    let olddate = [];
    olddate = date;
    olddate[index].startTime = text;
    console.log(olddate);
    setDate(olddate);
  };
  const changeEndTime = (text, index) => {
    // olddate = date;
    //console.log(olddate[index].endTime);
    let olddate = [];
    olddate = date;
    olddate[index].endTime = text;
    console.log(text);
    setDate(olddate);
  };

  return (
    <View style={styles.container1}>
      <Header
        title="Edit Device"
        nav={props.navigation}
        buttonsEnabled={true}
      />
      <ScrollView style={styles.container2}>
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
          <View>
            {date.map((item, index) => {
              return (
                <View
                  style={{
                    paddingtop: 50,
                    //backgroundColor: 'red',
                  }}>
                  <View style={styles.inputView3}>
                    <View>
                      <Text style={styles.heading2}>Start Time</Text>
                    </View>
                    <TextInput
                      style={styles.TextInput}
                      value={item.startTime.toString()}
                      placeholder="Rating in Watts"
                      selectionColor="white"
                      placeholderTextColor="#AAA"
                      underlineColorAndroid="#D2D6DE"
                      onChangeText={text => changeStartTime(text, index)}
                    />
                  </View>
                  <View
                    style={{
                      paddingBottom: 50,
                      //backgroundColor: 'red',
                      height: 100,
                    }}>
                    <Text style={styles.heading3}>End Time</Text>
                    <TextInput
                      style={styles.TextInput}
                      value={item.endTime.toString()}
                      placeholder="Rating in Watts"
                      selectionColor="white"
                      placeholderTextColor="#AAA"
                      underlineColorAndroid="#D2D6DE"
                      onChangeText={i => changeEndTime(i, index)}
                    />
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.buttonOuterView}>
            <View style={styles.row1}>
              <Button
                style={styles.button2}
                mode="contained"
                onPress={() => {
                  console.log(props.route.params.deviceInfo.room);
                  props.navigation.push('vrRooms', {
                    roomSelect: false,
                    deviceSelect: true,
                    deviceArray: [{id: deviceId}],
                  });
                }}>
                View Device Consumption
              </Button>
            </View>
            <View style={styles.row2}>
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
        </View>
      </ScrollView>
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
  heading2: {
    color: '#606060',
    marginLeft: 32,
    //marginTop: 50,
  },
  heading3: {
    color: '#606060',
    marginLeft: 32,
    marginTop: 10,
    //marginTop: 50,
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
    marginLeft: 20,
    borderRadius: 10,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
  },
  container2: {
    // flex: 1,
    // alignItems: 'center',
    // backgroundColor: '#F4F5F8',
  },
  inputView: {
    // backgroundColor: 'white',
    width: wp('90%'),
    height: 50,
    marginBottom: 20,
    // alignItems: 'center',
  },
  inputView3: {
    // backgroundColor: 'white',
    width: wp('90%'),
    height: 50,
    marginBottom: 20,
    //marginTop: 10,
    // alignItems: 'center',
  },
  inputView2: {
    // backgroundColor: 'white',
    flex: 1,
    width: wp('90%'),
    height: 50,
    marginBottom: 20,
    alignItems: 'center',
    margin: 10,
  },
  TextInput: {
    height: 50,
    width: wp('90%'),
    // flex: 1,
    marginTop: 10,
    fontSize: 18,
    alignItems: 'flex-start',
    paddingLeft: 20,
    color: 'black',
    backgroundColor: '#F4F5F8',
  },
  otherboxes: {
    // height: hp('50%'),
    width: wp('90%'),
    marginTop: 50,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonOuterView: {
    width: wp('90%'),
    flexDirection: 'column',
    marginLeft: 15,
    alignItems: 'center',
  },
  row1: {},
  row2: {
    marginTop: 15,
    flexDirection: 'row',
  },
  // otherboxes2: {
  //   marginTop: 20,
  //   height: hp('20%'),
  //   width: wp('100%'),
  //   flexDirection: 'row',
  //   marginLeft: 10,
  //   // alignItems: 'center',
  // },
  space: {
    width: wp('5%'),
  },
  button2: {
    marginTop: 35,
    width: wp('85%'),
    height: 45,
    backgroundColor: '#42A4FE',
    justifyContent: 'center',
  },
  button1: {
    width: wp('40%'),
    height: 45,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: '#42A4FE',
  },
});
export default EditDevice;
