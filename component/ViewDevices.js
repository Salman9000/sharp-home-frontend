import React from 'react';
import {useState, setState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Switch,
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

const ViewDevices = props => {
  //   const {deviceName, deviceRating} = props.route.params;
  const token = props.token;
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [consumptions, setConsumptions] = useState([]);
  const [deviceItem, setDeviceItem] = useState();
  let swipeBtns = [
    {
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        deleteNote();
      },
    },
  ];

  const createTwoButtonAlert = () =>
    Alert.alert('Device Delete', `Do you want to delete ${deviceItem.name} `, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteDevice},
    ]);

  const deleteNote = () => {
    createTwoButtonAlert();
  };

  const getDevices = async () => {
    try {
      const response = await instance(token).get(
        `/v1/devices/getDevicesWithRooms`,
      );
      setDevices(response.data.docs);
      console.log(response.data.docs[0].roomInfo[0].name);
      setLoading(false);
    } catch (err) {
      console.log('get devices in view devices ' + err);
    }
  };
  const deviceInfo = item => {
    console.log(item);
    props.navigation.push('editDevice', {
      deviceInfo: item,
    });
  };

  const deleteDevice = async props => {
    try {
      // alert('Do you want to delete the Device');
      const response = await instance(token).delete(`/v1/devices/${deviceId}`);
      if (response) {
        setDevices(devices.filter(value => value.id !== deviceItem.id));
      }
    } catch (error) {
      console.log(
        'There has been a problem with your fetch operation in enterhouse login: ' +
          error.message,
      );
    }
  };

  const addDeviceButtonPressed = props => {
    props.navigation.navigate('addDevice');
  };

  const turnOnDevice = async item => {
    try {
      setBtnLoading(true);
      // console.log(BASE_URL, 'turn on device');
      // console.log(item.id, 'turn on device');
      if (item.ip != undefined) {
        const response = await axios.post(
          `http://${item.ip}:8081/zeroconf/switch`,
          {
            deviceid: '',
            data: {
              switch: 'on',
            },
          },
        );
      }
      const response2 = await axios.patch(
        `${BASE_URL}/v1/devices/info/${item._id}`,
        {
          status: 'on',
        },
      );
      console.log(response2.data);

      setDevices(
        devices.map(value => {
          {
            if (value._id == item._id) {
              value.status = 'on';
            } else {
              value.status = value.status;
            }
          }
          return value;
        }),
      );
      setBtnLoading(false);
    } catch (error) {
      setBtnLoading(false);
      console.log(error);
    }
  };

  const turnOffDevice = async item => {
    try {
      setBtnLoading(true);
      // console.log(BASE_URL, 'turn off device');
      // console.log(item.id, 'turn off device');
      if (item.ip != undefined) {
        const response = await axios.post(
          `http://${item.ip}:8081/zeroconf/switch`,
          {
            deviceid: '',
            data: {
              switch: 'off',
            },
          },
        );
      }
      const response2 = await axios.patch(
        `${BASE_URL}/v1/devices/info/${item._id}`,
        {
          status: 'off',
        },
      );
      // console.log(response2.data);
      setDevices(
        devices.map(value => {
          {
            if (value._id == item._id) {
              value.status = 'off';
            } else {
              value.status = value.status;
            }
          }
          return value;
        }),
      );
      setBtnLoading(false);
    } catch (error) {
      setBtnLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    // getConsumptions();
    getDevices();
  }, []);

  return (
    <View style={styles.container1}>
      <Header
        title="All Devices"
        nav={props.navigation}
        buttonsEnabled={true}
      />
      <>
        {loading ? (
          <Loading />
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
                  <Card style={styles.card} transparent={true}>
                    <Swipeout
                      right={swipeBtns}
                      autoClose={true}
                      backgroundColor="transparent"
                      onOpen={() => setDeviceItem(item)}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 20,
                        }}
                        onPress={() => deviceInfo(item)}>
                        <CardItem
                          header
                          style={{
                            backgroundColor: 'transparent',
                            marginLeft: 0,
                            marginTop: 0,
                            marginRight: 0,
                            marginBottom: 0,
                          }}>
                          <Left>
                            <Text style={styles.deviceName}>{item.name}</Text>
                          </Left>
                          {/* <Right>
                            <Text style={styles.deviceCount}>
                              Power Rating: {item.powerRating} kWh
                            </Text>
                          </Right> */}
                          <Right>
                            {item.status === 'on' ? (
                              btnLoading ? (
                                <Switch
                                  trackColor={{
                                    false: '#B2B7C6',
                                    true: '#B2B7C6',
                                  }}
                                  onValueChange={{}}
                                  disabled={true}
                                  value={item.status === 'on'}
                                />
                              ) : (
                                <>
                                  <Switch
                                    trackColor={{
                                      false: '#B2B7C6',
                                      true: '#B2B7C6',
                                    }}
                                    thumbColor={
                                      item.status === 'on'
                                        ? '#38d238'
                                        : '#EA362A'
                                    }
                                    onValueChange={() => turnOffDevice(item)}
                                    value={item.status === 'on'}
                                  />
                                </>
                              )
                            ) : btnLoading ? (
                              <Switch
                                trackColor={{
                                  false: '#B2B7C6',
                                  true: '#B2B7C6',
                                }}
                                onValueChange={{}}
                                value={item.status === 'on'}
                              />
                            ) : (
                              <Switch
                                trackColor={{
                                  false: '#B2B7C6',
                                  true: '#B2B7C6',
                                }}
                                thumbColor={
                                  item.status === 'on' ? '#38d238' : '#EA362A'
                                }
                                onValueChange={() => turnOnDevice(item)}
                                value={item.status === 'on'}
                              />
                            )}
                          </Right>
                        </CardItem>
                        <CardItem
                          style={{
                            marginLeft: 10,
                            marginTop: 0,
                            marginRight: 0,
                            marginBottom: 0,
                          }}>
                          <Text style={styles.roomName}>
                            Room Name: {item.roomInfo[0].name}
                          </Text>
                        </CardItem>
                      </TouchableOpacity>
                    </Swipeout>
                  </Card>
                  {/* </TouchableOpacity> */}
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

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#F4F5F8',
  },
  scrollv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    backgroundColor: 'transparent',
    flex: 1,
    margin: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    height: 120,
  },
  cardItem: {
    backgroundColor: 'transparent',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 0,
  },
  TextInput: {
    height: 50,
    width: wp('90%'),
    flex: 1,
    fontSize: 20,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  deviceName: {
    fontFamily: 'Roboto',
    color: '#303849',
    fontWeight: 'bold',
    fontSize: 22,
  },
  roomName: {
    fontFamily: 'Roboto',
    color: '#303849',
    fontWeight: '300',
    fontSize: 14,
  },
  deviceCount: {
    fontWeight: '400',
    fontSize: 12,
  },
  desc: {
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
    justifyContent: 'center',
    marginTop: 30,
    alignSelf: 'center',
    width: wp('88%'),
    backgroundColor: '#42A4FE',
  },
});
export default ViewDevices;
