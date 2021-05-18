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

const SelectRoom = props => {
  const token = props.token;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const cardPressed = (id, name) => {
    props.navigation.navigate('vrChooseRoomAndDevice', {
      roomId: id,
      roomName: name,
      roomArray: rooms,
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
      <Header title="Select Room" />
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            <ScrollView style={styles.container2}>
              {rooms.map(item => (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => {
                      cardPressed(item.id, item.name);
                    }}>
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
    fontSize: 32,
  },
  deviceCount: {
    fontWeight: '400',
    fontSize: 15,
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
    fontSize: 40,
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
  button: {
    marginTop: 15,
    alignSelf: 'center',
    width: wp('90%'),
  },
});

export default SelectRoom;
