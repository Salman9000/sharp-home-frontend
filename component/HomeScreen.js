import React, {useEffect, useState} from 'react';
// import {Button, TextInput} from 'react-native-paper';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Button, Text, Icon} from 'native-base';
import Header from './Header';
import Footer from './Footer';
import instance from '../helper';
import {BASE_URL} from '@env';

const HomeScreen = props => {
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const token = props.token;

  const getRooms = async () => {
    try {
      const response = await instance(token).get('/v1/rooms'); //
      setRooms(response.data.docs);
      if (response.data.docs.length === 0) {
        props.navigation.replace('noRoom');
      }
      return 1;
    } catch (error) {
      console.log(error);
    }
  };
  const graphOne = () => {
    <Text>Hi</Text>;
  };
  const getDevices = async () => {
    try {
      const response = await instance(token).get('/v1/devices');
      setDevices(response.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getRooms();
    getDevices();
  }, []);

  const addDeviceButtonPressed = props => {
    props.navigation.replace('addDevice');
  };
  return (
    <View style={styles.scroll}>
      <Header title="Welcome" />
      <View style={styles.scrollv}>
        {devices.length <= 0 ? (
          <>
            <Text style={styles.text}>No Devices</Text>
            <Text style={styles.text}>Found</Text>
            <Button
              style={styles.iconContainer}
              onPress={() => addDeviceButtonPressed(props)}>
              <Icon name="add" style={styles.icon} />
            </Button>
          </>
        ) : (
          <>
            <graphOne />
          </>
        )}
      </View>
      <Footer nav={props} />
    </View>
  );
};

export default HomeScreen;

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
  icon: {
    fontSize: 40,
  },
  text: {
    fontSize: 40,
  },
});
