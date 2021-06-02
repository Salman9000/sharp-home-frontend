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

  let swipeBtns = [
    {
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: e => {
        deleteNote(e);
      },
    },
  ];

  const deleteNote = () => {
    deleteRoom();
  };

  const deleteRoom = async props => {
    try {
      //   alert('Do you want to delete the Device');
      const response = await instance(token).delete(`/v1/devices/${roomId}`);
      if (response) {
        setRooms(rooms.filter(value => value.id !== roomId));
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
                  <Card style={styles.card}>
                    <Swipeout
                      right={swipeBtns}
                      autoClose="true"
                      backgroundColor="transparent"
                      onOpen={() => setRoomId(item.id)}>
                      <TouchableOpacity onPress={() => roomInfo(item)}>
                        <CardItem header>
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
  },
  scrollv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    width: wp('95%'),
    margin: 10,
  },
  cardItem: {
    width: wp('90%'),
    height: 120,

    //   alignItems: 'center',
  },
  card: {
    marginTop: 20,
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
    fontWeight: 'bold',
    fontSize: 28,
  },
  deviceCount: {
    fontWeight: '400',
    fontSize: 12,
  },
  desc: {
    fontSize: 24,
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
    marginTop: 15,
    alignSelf: 'center',
    width: wp('90%'),
  },
});
export default ViewRooms;
