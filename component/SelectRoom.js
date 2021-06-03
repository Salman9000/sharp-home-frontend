import React from 'react';
import {useState, setState, useEffect} from 'react';
// import {Button as Button2, Icon} from 'native-base';
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
import {blue100} from 'react-native-paper/lib/typescript/styles/colors';

const SelectRoom = props => {
  const token = props.token;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomList, setRoomList] = useState([]);

  const roomSelection = (id, name) => {
    console.log(roomList);
    props.navigation.push('vrChooseRoomAndDevice', {
      roomList: roomList,
      roomArray: rooms,
      roomSelect: true,
      deviceSelect: false,
    });
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
      return 1;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (props.route.params.roomArray.length > 0) {
      setRooms(props.route.params.roomArray);
      setLoading(false);
    } else {
      getRooms();
    }
  }, []);

  return (
    <View style={styles.container1}>
      <Header
        title="Select Room"
        nav={props.navigation}
        buttonsEnabled={true}
      />
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Button
              style={
                roomList.length > 0
                  ? styles.buttonActive
                  : styles.buttonInactive
              }
              disabled={roomList.length > 0 ? false : true}
              onPress={() => {
                console.log(roomList);
                {
                  roomList.length > 0
                    ? roomSelection(props)
                    : console.log('no rooms selected');
                }
              }}>
              <Text>Continue</Text>
            </Button>
            <ScrollView style={styles.container2}>
              {rooms.map((item, i) => (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!item.highlight) {
                        let arr = [...rooms];
                        arr[i].highlight = true;
                        setRooms(arr);
                        setRoomList(oldArray => [...oldArray, item]);
                      } else {
                        let arr = [...rooms];
                        arr[i].highlight = false;
                        setRooms(arr);
                        setRoomList(
                          roomList.filter(value => value.id !== item.id),
                        );
                      }
                    }}>
                    {item.highlight ? (
                      <Card
                        style={styles.card}
                        pointerEvents="none"
                        backgroundColor={'#ECF0F9'}>
                        <CardItem header backgroundColor={'#ECF0F9'}>
                          <Left>
                            <Text style={styles.roomName}>{item.name}</Text>
                          </Left>
                          <Right>
                            <Text style={styles.deviceCount}>
                              Devices in Room: {item.count}
                            </Text>
                          </Right>
                        </CardItem>
                        <CardItem
                          style={styles.cardItem}
                          backgroundColor={'#ECF0F9'}>
                          <Left>
                            <Text style={styles.desc}>{item.desc}</Text>
                          </Left>
                        </CardItem>
                      </Card>
                    ) : (
                      <Card style={styles.card} pointerEvents="none">
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
                      </Card>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </>
      <Footer nav={props} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonActive: {
    backgroundColor: '#42A4FE',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: wp('90%'),
  },
  buttonInactive: {
    backgroundColor: '#B2B7C6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: wp('90%'),
  },
  container1: {
    flex: 1,
  },
  scrollv: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    backgroundColor: 'transparent',
    flex: 1,
    margin: 10,
  },
  card: {
    width: wp('88%'),
    alignSelf: 'center',
    marginTop: 20,
    height: 110,
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
    fontSize: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    position: 'fixed',
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#1e90ff',
    padding: 7,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

export default SelectRoom;
