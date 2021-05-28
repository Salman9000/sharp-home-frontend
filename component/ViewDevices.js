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

const ViewDevices = props => {
  //   const {deviceName, deviceRating} = props.route.params;
  const token = props.token;
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [consumptions, setConsumptions] = useState([]);

  const getDevices = async () => {
    try {
      const response = await instance(token).get(`/v1/devices`);
      setDevices(response.data.docs);
      setLoading(false);
    } catch (err) {
      console.log('get devices in view devices ' + err);
    }
  };

  const addDeviceButtonPressed = props => {
    props.navigation.navigate('addDevice');
  };

  const turnOffDevice = async item => {
    try {
      if (item.ip != undefined) {
        setBtnLoading(true);
        //192.168.31.125:8081/zeroconf/switch
        const response = await axios.post(
          `http://${item.ip}:8081/zeroconf/switch`,
          {
            deviceid: '',
            data: {
              switch: 'off',
            },
          },
        );
        const response2 = await axios.patch(
          `${BASE_URL}/v1/devices/getDevice/${item.id}`,
          {
            status: 'off',
          },
        );
        setBtnLoading(false);
      } else {
        console.log('ip doesnt exist');
      }
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
    } catch (error) {
      console.log(
        'There has been a problem with your fetch operation in enterhouse login: ' +
          error.message,
      );
    }
  };

  const turnOnDevice = async item => {
    try {
      if (item.ip != undefined) {
        setBtnLoading(true);
        //192.168.31.125:8081/zeroconf/switch
        const response = await axios.post(
          `http://${item.ip}:8081/zeroconf/switch`,
          {
            deviceid: '',
            data: {
              switch: 'on',
            },
          },
        );
        const response2 = await axios.patch(
          `${BASE_URL}/v1/devices/getDevice/${item.id}`,
          {
            status: 'on',
          },
        );
        setBtnLoading(false);
      } else {
        console.log('ip doesnt exist');
      }
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
    } catch (error) {
      console.log(
        'There has been a problem with your fetch operation in enterhouse login: ' +
          error.message,
      );
    }
  };

  useEffect(() => {
    // getConsumptions();
    getDevices();
  }, []);

  return (
    <View style={styles.container1}>
      <Header title="All Devices" />
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
                  <TouchableOpacity>
                    <Card style={styles.card}>
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
                    </Card>
                  </TouchableOpacity>
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
