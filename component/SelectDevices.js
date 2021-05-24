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

const SelectDevices = props => {
  //   const {deviceName, deviceRating} = props.route.params;
  const token = props.token;
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deviceList, setDeviceList] = useState([]);

  const deviceSelection = (id, name) => {
    console.log(deviceList);
    props.navigation.navigate('vrChooseRoomAndDevice', {
      // deviceId: id,
      // deviceName: name,
      deviceList: deviceList,
      deviceArray: devices,
      deviceSelect: true,
      roomSelect: false,
    });
  };
  const getDevices = async () => {
    try {
      const response = await instance(token).get('/v1/devices');
      tempList = [];
      console.log(response.data.docs);
      tempList = response.data.docs.map(value => ({
        id: value.id,
        name: value.name,
        powerRating: value.powerRating,
        highlight: false,
        // consumption: value.total.toFixed(2),
      }));
      setDevices(tempList);
      setLoading(false);
    } catch (err) {
      console.log('get devices in view devices ' + err);
    }
  };

  const addDeviceButtonPressed = props => {
    props.navigation.navigate('addDevice');
  };

  useEffect(() => {
    console.log(props.route.params.rooms, 'Yahay');

    if (props.route.params.deviceArray.length > 0) {
      setDevices(props.route.params.deviceArray);
      setLoading(false);
    } else {
      getDevices();
    }
  }, []);

  return (
    <View style={styles.container1}>
      <Header title="All Devices" />
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Button
              style={styles.buttonContinue}
              disabled={deviceList.length > 0 ? false : true}
              onPress={() => {
                console.log(deviceList);
                {
                  deviceList.length > 0
                    ? deviceSelection(props)
                    : console.log('no devices found');
                }
              }}>
              <Text>Continue</Text>
            </Button>
            <ScrollView style={styles.container2}>
              {devices.map((item, i) => (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!item.highlight) {
                        let arr = [...devices];
                        arr[i].highlight = true;
                        setDevices(arr);
                        setDeviceList(oldArray => [...oldArray, item]);
                      } else {
                        let arr = [...devices];
                        arr[i].highlight = false;
                        setDevices(arr);
                        setDeviceList(
                          deviceList.filter(value => value.id !== item.id),
                        );
                      }
                      // deviceSelection();
                    }}>
                    {item.highlight ? (
                      <>
                        <Card
                          style={styles.card}
                          pointerEvents="none"
                          backgroundColor={'#ECF0F9'}>
                          <CardItem header backgroundColor={'#ECF0F9'}>
                            <Left>
                              <Text style={styles.roomName}>{item.name}</Text>
                            </Left>
                            <Right>
                              <Text style={styles.deviceCount}>
                                Power Rating: {item.powerRating} kWh
                              </Text>
                            </Right>
                          </CardItem>
                        </Card>
                      </>
                    ) : (
                      <>
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
                          </CardItem>
                        </Card>
                      </>
                    )}
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

const styles = StyleSheet.create({
  buttonContinue: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
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
    marginTop: 10,
  },
  cardHightlight: {
    // marginTop: 20,
    backgroundColor: 'red',
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
export default SelectDevices;
