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

const ViewDevices = props => {
  //   const {deviceName, deviceRating} = props.route.params;
  const token = props.token;
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consumptions, setConsumptions] = useState([]);

  const cardPressed = id => {
    console.log(id);
    getConsumptions();
  };

  const getConsumptions = () => {
    try {
      instance(token)
        .get('/v1/devices/getConsumptions')
        .then(res => {
          console.log(res.data.result.docs[0]);
          for (let i = 0; i < res.data.result.docs.length; i++) {
            let cons = res.data.result.docs[0].total;
            console.log('cons ' + cons);
            if (consumptions.length < 1) {
              setConsumptions([cons]);
            }
            console.log(consumptions);
          }
          //   return res.data.result.docs('total');
          //   return res.data.result.docs[0];
        });
    } catch (error) {
      console.log('error in viewdevices getconsumption:' + error);
    }
  };

  const getDevices = async () => {
    try {
      instance(token)
        .get('/v1/devices')
        .then(value => {
          for (let i = 0; i < value.data.docs.length; i++) {
            let dev = value.data.docs[i];
            // console.log(getConsumption(dev.id));
            if (devices.length < 1) {
              setDevices([
                {
                  id: dev.id,
                  name: dev.name,
                  count: i,
                  //   consumption: getConsumption(dev.id),
                },
              ]);
            } else {
              setDevices([
                ...devices,
                {
                  id: dev.id,
                  name: dev.name,
                  count: i,
                  //   consumption: getConsumption(dev.id),
                },
              ]);
            }
          }
          // console.log(devices[0]);
          // setDevices(value.data.docs);
          setLoading(false);
          if (value.data.docs.length === 0) {
            //  props.navigation.replace('noRoom');
            console.log('no devices');
          }
        });
      return 1;
    } catch (error) {
      console.log(error);
    }
  };
  const LoadingScreen = () => (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );

  const addDeviceButtonPressed = props => {
    props.navigation.navigate('addDevice');
  };

  useEffect(() => {
    getDevices();
    // getConsumption(devices[0].id);
  }, []);

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

  return (
    <View style={styles.container1}>
      <Header title="All Devices" />
      <>
        {loading ? (
          <LoadingScreen />
        ) : devices.length < 1 ? (
          <View style={styles.scrollv}>
            <Text style={styles.text}>No Devices</Text>
            <Text style={styles.text}>Found</Text>
            <Button
              style={styles.iconContainer}
              onPress={() => addDeviceButtonPressed(props)}>
              <Icon name="add" style={styles.icon} />
            </Button>
          </View>
        ) : (
          <>
            <ScrollView style={styles.container2}>
              {devices.map(item => (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => {
                      cardPressed(item.id);
                    }}>
                    <Card style={styles.card} pointerEvents="none">
                      <CardItem header>
                        <Left>
                          <Text style={styles.roomName}>{item.name}</Text>
                        </Left>
                        <Right>
                          <Text style={styles.deviceCount}>
                            Total Consumption of Device:{' '}
                          </Text>
                        </Right>
                      </CardItem>
                      {/* <CardItem style={styles.cardItem}>
                        <Left>
                          <Text style={styles.desc}>{item.desc}</Text>
                        </Left>
                      </CardItem> */}
                    </Card>
                  </TouchableOpacity>
                </View>
              ))}
              <Button
                style={styles.button}
                onPress={() => addDeviceButtonPressed(props)}>
                <Text>Add Device</Text>
              </Button>
            </ScrollView>
          </>
        )}
      </>
      <Footer nav={props} />
    </View>
  );
};

export default ViewDevices;
