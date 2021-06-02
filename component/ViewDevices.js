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
import Swipeout from 'react-native-swipeout';

const ViewDevices = props => {
  //   const {deviceName, deviceRating} = props.route.params;
  const token = props.token;
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [consumptions, setConsumptions] = useState([]);
  const [deviceId, setDeviceId] = useState();
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

  const deleteNote = () => {
    deleteDevice();
  };

  const getDevices = async () => {
    try {
      const response = await instance(token).get(`/v1/devices`);
      setDevices(response.data.docs);
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
      //   alert('Do you want to delete the Device');
      const response = await instance(token).delete(`/v1/devices/${deviceId}`);
      if (response) {
        setDevices(devices.filter(value => value.id !== deviceId));
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
      const response2 = await axios.patch(`${BASE_URL}/v1/devices/${item.id}`, {
        status: 'on',
      });
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
      console.log(response2.data);
      setDevices(
        devices.map(value => {
          {
            if (value.id == item.id) {
              value.status = 'on';
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
      const response2 = await axios.patch(`${BASE_URL}/v1/devices/${item.id}`, {
        status: 'off',
      });
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
      console.log(response2.data);
      setDevices(
        devices.map(value => {
          {
            if (value.id == item.id) {
              value.status = 'off';
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
                  <Card style={styles.card}>
                    <Swipeout
                      right={swipeBtns}
                      autoClose="true"
                      backgroundColor="transparent"
                      onOpen={() => setDeviceId(item.id)}>
                      <TouchableOpacity onPress={() => deviceInfo(item)}>
                        <CardItem header>
                          <Left>
                            <Text style={styles.roomName}>{item.name}</Text>
                          </Left>
                          <Right>
                            <Text style={styles.deviceCount}>
                              Power Rating: {item.powerRating} kWh
                            </Text>
                          </Right>
                          <Right>
                            {item.status == 'on' ? (
                              btnLoading ? (
                                <Button
                                  style={{
                                    backgroundColor: '#78ef78',
                                    padding: 15,
                                    borderRadius: 50,
                                    color: 'white',
                                  }}>
                                  <Text>
                                    {' '}
                                    <Loading color="white" size="small" />
                                  </Text>
                                </Button>
                              ) : (
                                <Button
                                  style={{
                                    backgroundColor: '#38d238',
                                    padding: 15,
                                    borderRadius: 50,
                                    color: 'white',
                                  }}
                                  onPress={() => turnOffDevice(item)}>
                                  <Text>{item.status}</Text>
                                </Button>
                              )
                            ) : btnLoading ? (
                              <Button
                                style={{
                                  backgroundColor: '#e05454',
                                  padding: 15,
                                  borderRadius: 50,
                                  color: 'white',
                                }}>
                                <Text>
                                  <Loading color="white" size="small" />
                                </Text>
                              </Button>
                            ) : (
                              <Button
                                style={{
                                  backgroundColor: '#ce2222',
                                  padding: 15,
                                  borderRadius: 50,
                                  color: 'white',
                                }}
                                onPress={() => turnOnDevice(item)}>
                                <Text>{item.status}</Text>
                              </Button>
                            )}
                          </Right>
                        </CardItem>
                      </TouchableOpacity>
                    </Swipeout>
                  </Card>
                  {/* </TouchableOpacity> */}
                </View>
              ))}

              {/* <View>
                {devices.map(item => (
                  {
                    item.status == 'on' ? (
                      <TouchableOpacity
                        key={item.id}
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
                                Power Rating: {item.powerRating} kWh
                              </Text>
                            </Right>
                            <Right>
                              <Text
                                style={{
                                  backgroundColor: '#38d238',
                                  padding: 15,
                                  borderRadius: 50,
                                  color: 'white',
                                }}
                                onPress={() => turnOffDevice(item)}>
                                {item.status}
                              </Text>
                            </Right>
                          </CardItem>
                        </Card>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        key={item.id}
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
                                Power Rating: {item.powerRating} kWh
                              </Text>
                            </Right>
                            <Right>
                              <Text
                                style={{
                                  backgroundColor: '#ce2222',
                                  padding: 15,
                                  borderRadius: 50,
                                  color: 'white',
                                }}
                                onPress={() => turnOnDevice(item)}>
                                {item.status}
                              </Text>
                            </Right>
                          </CardItem>
                        </Card>
                      </TouchableOpacity>
                    );
                  }
                ))}
              </View> */}
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
    fontSize: 28,
  },
  deviceCount: {
    fontWeight: '400',
    fontSize: 12,
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
    marginTop: 15,
    alignSelf: 'center',
    width: wp('90%'),
  },
});
export default ViewDevices;
