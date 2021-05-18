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
  const [consumptions, setConsumptions] = useState([]);

  const cardPressed = id => {
    console.log(id);
    // getConsumptions();
  };

  const getConsumptions = async () => {
    try {
      const response = await instance(token).get('/v1/devices/getConsumptions');
      tempList = [];
      console.log(response.data.result.docs);
      tempList = response.data.result.docs.map(value => ({
        id: value.dev[0]._id,
        name: value.dev[0].name,
        consumption: value.total.toFixed(2),
      }));
      setDevices(tempList);
    } catch (error) {
      console.log('error in viewdevices getconsumption:' + error);
    }
    setLoading(false);
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
                    </CardItem>
                    {/* <CardItem style={styles.cardItem}>
                        <Left>
                          <Text style={styles.desc}>{item.desc}</Text>
                        </Left>
                      </CardItem> */}
                  </Card>
                </TouchableOpacity>
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
