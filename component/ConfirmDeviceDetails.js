import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {Button, Text, Icon} from 'native-base';
import {BASE_URL} from '@env';
import instance from '../helper';

const ConfirmDeviceDetails = props => {
  const token = props.token;
  const {deviceName, deviceRating, roomId} = props.route.params;
  const confirmButtonPressed = props => {
    addDevice(); // props.navigation.replace('addRoom');
  };

  const addDevice = async () => {
    try {
      const response = await instance(token).post(`${BASE_URL}/v1/devices`, {
        name: deviceName,
        powerRating: deviceRating,
        room: roomId,
      });
      alert('room added');
      console.log(response.data.docs);
    } catch (error) {
      console.log('adddevice in confirmDevice ' + error);
    }
  };
  const styles = StyleSheet.create({
    container1: {
      flex: 1,
    },
    container2: {
      flex: 1,
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.container1}>
      <Header title="Confirm Room" />
      <View style={styles.container2}>
        <View>
          <Text>{deviceName}</Text>
          <Text>{deviceRating}</Text>
          <Text>{roomId}</Text>
          <Button
            onPress={() => {
              confirmButtonPressed(props);
            }}>
            <Text>Add Device</Text>
          </Button>
        </View>
      </View>
      <Footer nav={props} />
    </View>
  );
};

export default ConfirmDeviceDetails;
