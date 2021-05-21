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
  // const [rooms, setRooms] = useState(props.route.params.roomArray);
  const [deviceArray, setDeviceArray] = useState([]);
  const [deviceParams, setDeviceParams] = useState('');
  const [startDate, setStartDate] = useState(props.route.params.startDate);
  const [endDate, setendDate] = useState(props.route.params.endDate);
  const [loading, setLoading] = useState(true);
  const token = props.token;
  console.log('im in view report room');

  const addDevice2Pressed = props => {
    props.navigation.replace('addDevice');
  };

  const viewReport = props => {
    props.navigation.replace('vrChooseRoomAndDevice');
  };

  const getDevices = async () => {
    setLoading(true);
    const roomParams = props.route.params.roomsArray
      .map((value, i) => {
        return `room${i + 1}=${value.id}`;
      })
      .join('&');
    const response = await instance(token).get(
      `/v1/devices/rooms/?${roomParams}`,
    );
    setDeviceArray(response.data);
    setDeviceParams(
      response.data.map((value, i) => `device${i + 1}=${value}`).join('&'),
    );
    setLoading(false);
  };

  useEffect(() => {
    getDevices();
    console.log(startDate + ' ' + endDate);
  }, []);

  return (
    <View style={styles.scroll}>
      <Header title="Room Report" />
      <View style={styles.scrollv}>
        <>
          {loading ? (
            <Loading />
          ) : (
            <ScrollView style={{backgroundColor: 'white'}}>
              <View style={styles.buttonView1}>
                <Button
                  style={styles.button1}
                  mode="contained"
                  onPress={() => {
                    props.navigation.replace('chooseDate', {
                      deviceArray: props.route.params.deviceArray,
                      roomsArray: props.route.params.roomsArray,
                    });
                  }}>
                  Choose Dates
                </Button>
              </View>
              <RoomChart
                {...props}
                token={token}
                deviceParams={deviceParams}
                startDate={startDate}
                endDate={endDate}
              />
              <ApplianceChart
                {...props}
                token={token}
                deviceParams={deviceParams}
                deviceArray={deviceArray}
              />
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
          )}
        </>
      </View>
      <Footer nav={props} />
    </View>
  );
};

export default VRrooms;

const styles = StyleSheet.create({
  buttonView1: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 50,
    marginHorizontal: 30,
    paddingTop: 10,
  },
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
