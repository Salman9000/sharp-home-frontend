import React from 'react';
import {useState, setState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const axios = require('axios');
import {
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Right,
  Button,
  Icon,
} from 'native-base';
import {BASE_URL} from '@env';
import instance from '../helper';
import Loading from './Loading';
import Swipeout from 'react-native-swipeout';

const ViewRooms = props => {
  const token = props.token;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState();
  const [roomItem, setRoomItem] = useState();

  let swipeBtns = [
    {
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        createTwoButtonAlert();
      },
    },
  ];

  const createTwoButtonAlert = () =>
    Alert.alert('Device Room', `Do you want to delete ${roomItem.name} `, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteRoom()},
    ]);

  const deleteNote = () => {
    deleteRoom();
  };

  const deleteRoom = async props => {
    try {
      //   alert('Do you want to delete the Device');
      const response = await instance(token).delete(`/v1/devices/${roomId}`);
      if (response) {
        setRooms(rooms.filter(value => value.id !== roomItem.id));
      }
    } catch (error) {
      console.log(
        'There has been a problem with your fetch operation in enterhouse login: ' +
          error.message,
      );
    }
  };
  const getRooms = async () => {
    try {
      const response = await instance(token).get(`/v1/rooms`);
      tempList = [];
      tempList = response.data.docs.map(value => ({
        id: value.id,
        name: value.name,
        desc: value.description,
        count: value.deviceCount,
        devices: value.devices,
        highlight: false,
      }));
      setRooms(tempList);
      setLoading(false);
    } catch (err) {
      console.log('get rooms in view rooms ' + err);
    }
  };
  const roomInfo = item => {
    console.log(item);
    props.navigation.push('editRoom', {
      roomInfo: item,
    });
  };

  const addRoomButtonPressed = props => {
    props.navigation.navigate('addRoom');
  };

  useEffect(() => {
    // getConsumptions();
    getRooms();
  }, []);

  return (
    <View style={styles.container1}>
      <Header title="All Rooms" nav={props.navigation} buttonsEnabled={true} />
      <>
        {loading ? (
          <Loading />
        ) : rooms.length < 1 ? (
          <View style={styles.scrollv}>
            <Text style={styles.text}>No Rooms</Text>
            <Text style={styles.text}>Found</Text>
            <Button
              style={styles.iconContainer}
              onPress={() => addRoomButtonPressed(props)}>
              <Icon name="add" style={styles.icon} />
            </Button>
          </View>
        ) : (
          <>
            <ScrollView style={styles.container2}>
              {rooms.map(item => (
                <View key={item.id}>
                  <Card style={styles.card} transparent={true}>
                    <Swipeout
                      right={swipeBtns}
                      autoClose={true}
                      backgroundColor="transparent"
                      onOpen={() => setRoomItem(item)}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: 'transparent',
                          borderRadius: 20,
                          height: 90,
                        }}
                        onPress={() => roomInfo(item)}>
                        <CardItem style={styles.cardItem}>
                          <Left>
                            <Text style={styles.roomName}>{item.name}</Text>
                          </Left>
                          <Right>
                            <Text style={styles.deviceCount}>
                              Devices in Room: {item.count}
                            </Text>
                          </Right>
                        </CardItem>
                        <CardItem style={styles.cardItem}>
                          <Left>
                            <Text style={styles.desc}>{item.desc}</Text>
                          </Left>
                        </CardItem>
                      </TouchableOpacity>
                    </Swipeout>
                  </Card>
                </View>
              ))}

              <Button
                style={styles.button}
                onPress={() => addRoomButtonPressed(props)}>
                <Text>Add Room</Text>
              </Button>
            </ScrollView>
          </>
        )}
      </>
      <Footer nav={props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#F4F5F8',
  },
  scrollv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    backgroundColor: 'transparent',
    flex: 1,
    margin: 10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    width: wp('88%'),
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    height: 100,
  },
  cardItem: {
    backgroundColor: 'transparent',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 0,
  },
  TextInput: {
    height: 50,
    width: wp('90%'),
    flex: 1,
    fontSize: 20,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  roomName: {
    fontFamily: 'Roboto',
    color: '#303849',
    fontWeight: 'bold',
    fontSize: 22,
  },
  deviceCount: {
    color: '#303849',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
  },
  desc: {
    color: '#303849',
    fontFamily: 'Roboto',
    fontSize: 14,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
  },
  text: {
    fontSize: 36,
  },
  iconContainer: {
    width: 80,
    height: 80,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    borderRadius: 80,
    backgroundColor: '#1e90ff',
    padding: 7,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  button: {
    justifyContent: 'center',
    marginTop: 30,
    alignSelf: 'center',
    width: wp('88%'),
    backgroundColor: '#42A4FE',
  },
});
export default ViewRooms;
