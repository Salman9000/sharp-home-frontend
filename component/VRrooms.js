import React, {useEffect, useState} from 'react';
// import {Button, TextInput} from 'react-native-paper';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Button as Button2, Text, Icon} from 'native-base';
import {Button} from 'react-native-paper';
import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';
import instance from '../helper';
import {BASE_URL} from '@env';
import {template} from '@babel/core';
import RoomChart from './RoomChart';
import ApplianceChart from './ApplianceChart';
const VRrooms = props => {
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = props.token;
  console.log('im in view report room');

  const addDevice2Pressed = props => {
    props.navigation.replace('addDevice');
  };

  const viewReport = props => {
    props.navigation.replace('vrChooseRoomAndDevice');
  };

  return (
    <View style={styles.scroll}>
      <Header title="Room Report" />
      <View style={styles.scrollv}>
        <>
          <ScrollView style={{backgroundColor: 'white'}}>
            <RoomChart {...props} token={token} />
            <ApplianceChart {...props} token={token} />
            <Button
              mode="contained"
              uppercase={false}
              style={{
                color: 'white',
                backgroundColor: '#42A4FE',
                marginHorizontal: 30,
                marginBottom: 30,
              }}
              contentStyle={{height: 50}}
              labelStyle={{fontSize: 18, fontWeight: 'bold'}}
              dark={true}
              onPress={() => viewReport(props)}>
              View More Reports
            </Button>
          </ScrollView>
        </>
      </View>
      <Footer nav={props} />
    </View>
  );
};

export default VRrooms;

const styles = StyleSheet.create({
  addDeviceButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 80,
    backgroundColor: 'lightblue',
  },
  scroll: {
    flex: 1,
  },

  scrollv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  icon: {
    fontSize: 40,
  },
  text: {
    fontSize: 40,
  },
});
