import React from 'react';
import {useState, setState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const axios = require('axios');
import {Card, CardItem, Body, Text, Left, Right} from 'native-base';
import {BASE_URL} from '@env';
import instance from '../helper';

const ChooseRoom = props => {
  const {deviceName, deviceRating} = props.route.params;
  const token = props.token;
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: 1,
      desc: 'Lorem ipsum dolor sit amet, everti rationibus his cu',
      count: 1,
    },

    {
      id: 2,
      name: 2,
      desc: 'Lorem ipsum dolor sit amet, everti rationibus his ',
      count: 2,
    },

    {
      id: 3,
      name: 3,
      desc: 'Lorem ipsum dolor sit amet, everti rationibus hi',
      count: 3,
    },
  ]);

  const getRooms = async () => {
    try {
      const response = await instance(token).get(`${BASE_URL}/v1/rooms`); //
      console.log(response.data.docs[0].description);
      const room = response.data.docs[0];
      for (let i = 0; i < response.data.docs.length; i++) {
        if (rooms.length < 1) {
          setRooms([
            {
              id: room.id,
              name: room.name,
              desc: room.description,
              count: room.deviceCount,
            },
          ]);
        } else {
        }
      }

      if (response.data.docs.length === 0) {
        //  props.navigation.replace('noRoom');
        console.log('no rooms');
      }

      return 1;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const styles = StyleSheet.create({
    container1: {
      flex: 1,
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
  });

  return (
    <View style={styles.container1}>
      <Header title="Choose a Room" />
      <ScrollView style={styles.container2}>
        {rooms.map(item => (
          <View key={item.id}>
            <Card style={styles.card}>
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
          </View>
        ))}
      </ScrollView>
      <Footer nav={props} />
    </View>
  );
};

export default ChooseRoom;
