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
import ChartOne from './Chartone';
import ApplianceChart from './ApplianceChart';
const HomeScreen = props => {
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = props.token;
  console.log(token);
  const getDevices = async () => {
    const response = await instance(token).get('/v1/devices');
    setDevices(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getDevices();
  }, []);

  const addDevice2Pressed = props => {
    props.navigation.replace('addDevice');
  };

  const viewReport = props => {
    props.navigation.replace('vrChooseRoomAndDevice');
  };

  return (
    <View style={styles.scroll}>
      <Header title="Welcome" />
      <View style={styles.scrollv}>
        {loading ? (
          <Loading />
        ) : !devices ? (
          <>
            <Text style={styles.text}>No Devices</Text>
            <Text style={styles.text}>Found</Text>
            <Button2
              style={styles.iconContainer}
              onPress={() => addDevice2Pressed(props)}>
              <Icon name="add" style={styles.icon} />
            </Button2>
          </>
        ) : (
          <>
            <ScrollView style={{backgroundColor: 'white'}}>
              <ChartOne {...props} token={token} />
              <ApplianceChart {...props} token={token} />
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
