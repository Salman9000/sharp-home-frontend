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
import Loading from './Loading';
import instance from '../helper';
import {BASE_URL} from '@env';
import {template} from '@babel/core';
import ChartOne from './Chartone';
import ApplianceChart from './ApplianceChart';
const HomeScreen = props => {
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = props.token;

  const getDevices = async () => {
    instance(token)
      .get('/v1/devices')
      .then(value => {
        for (let i = 0; i < value.data.docs.length; i++) {
          let dev = value.data.docs[i];
          if (devices.length < 1) {
            setDevices([
              {
                id: dev.id,
                name: dev.name,
              },
            ]);
          } else {
            setDevices([
              ...devices,
              {
                id: dev.id,
                name: dev.name,
              },
            ]);
          }
        }
        // console.log(devices[0]);
        // setDevices(value.data.docs);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDevices();
  }, []);

  const addDeviceButtonPressed = props => {
    props.navigation.replace('addDevice');
  };
  return (
    <View style={styles.scroll}>
      <Header title="Welcome" />
      <View style={styles.scrollv}>
        {loading ? (
          <Loading />
        ) : devices.length <= 0 ? (
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
            <ScrollView>
              <ChartOne {...props} token={token} />
              <ApplianceChart {...props} token={token} />
            </ScrollView>
            {/* <View>
              {devices.map(item => {
                return (
                  <View key={item.id}>
                    <Text>{item.name}</Text>
                  </View>
                );
              })}
            // </ScrollView> */}
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
