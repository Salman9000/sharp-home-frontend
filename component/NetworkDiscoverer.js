import React, {useEffect, useState} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  // Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
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
import {List, ListItem} from 'react-native-elements';
import Zeroconf from 'react-native-zeroconf';
import Footer from './Footer';
import Header from './Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import instance from '../helper';
import Loading from './Loading';

// import SelectDevices from './SelectDevices';

const zeroconf = new Zeroconf();

const NetworkDiscoverer = props => {
  const token = props.token;
  const [isScanning, setIsScanning] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState({});
  const [deviceName, setDeviceName] = useState('props.route.params.deviceName');
  const [deviceRating, setDeviceRating] = useState(
    'props.route.params.deviceRating',
  );
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState('props.route.params.roomId');
  const [wifiSsid, setWifiSsid] = useState('');
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the wifi');
        const ssid = await WifiManager.getCurrentWifiSSID();
        if (ssid) {
          console.log('Your current connected wifi SSID is ' + ssid);
          setWifiSsid(ssid);
        } else {
          console.log('Cannot get current SSID!');
          setWifiSsid(null);
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getDevices = async () => {
    try {
      const response = await instance(token).get(`/v1/devices`);
      setDevices(response.data.docs);
      setLoading(false);
      console.log('dfone');
    } catch (err) {
      console.log('get devices in view devices ' + err);
      setLoading(false);
    }
  };
  useEffect(() => {
    refreshData();
    zeroconf.on('start', () => {
      setIsScanning(true);
      console.log('[Start]');
    });

    zeroconf.on('stop', () => {
      setIsScanning(false);
      console.log('[Stop]');
    });

    zeroconf.on('resolved', service => {
      // console.log('[Resolve]', JSON.stringify(service, null, 2));
      setServices({...services, [service.host]: service});
    });

    zeroconf.on('error', err => {
      setIsScanning(false);
      console.log('[Error]', err);
    });
  }, []);

  const selectDevice = (host, name) => {
    console.log(roomId);
    props.navigation.navigate('confirmDeviceDetails', {
      deviceName: deviceName,
      deviceRating: deviceRating,
      roomId: roomId,
      host: host,
      name: name,
    });
  };

  const renderRow = ({item, index}) => {
    const {name, fullName, host, id} = services[item];
    let deviceExists = devices.map(value => value.deviceid).includes(id);
    return (
      <TouchableOpacity
        style={styles.list}
        onPress={() => {
          deviceExists ? Alert.alert('asd') : selectDevice(host, name);
        }}>
        <Card style={styles.card} pointerEvents="none" transparent={true}>
          <CardItem style={deviceExists && styles.cardItem} header>
            <Left>
              <Text style={styles.roomName}>{name}</Text>
            </Left>
            <Right>
              <Text style={styles.deviceCount}> {host}</Text>
              {deviceExists && <Text>Device already added</Text>}
            </Right>
          </CardItem>
        </Card>
        {/* <ListItem title={name} subtitle={fullName} /> */}
      </TouchableOpacity>
    );
  };

  const refreshData = () => {
    setLoading(true);
    getDevices();
    requestCameraPermission();
    if (isScanning) {
      return;
    }
    setServices([]);

    zeroconf.scan('ewelink', 'tcp', 'local.');

    // clearTimeout(timeout);
    setTimeout(() => {
      zeroconf.stop();
    }, 5000);
  };

  const service = services[selectedService];

  if (service) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => selectedService(null)}>
          <Text style={styles.closeButton}>{'CLOSE'}</Text>
        </TouchableOpacity>

        <Text style={styles.json}>{JSON.stringify(services, null, 2)}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Scanning For Devices'} />
      <Text style={styles.state}>
        {isScanning ? 'Scanning for Devices' : 'Scanning Stopped'}
      </Text>
      <Text style={styles.ssid}>
        {wifiSsid
          ? `Your Network name is: ${wifiSsid}`
          : 'Cannot get Network Name'}
      </Text>
      {loading && <Loading style={'no style'} />}
      {services.length < 1 && (
        <Text style={styles.ssid}>Unable to find devices</Text>
      )}
      <FlatList
        data={Object.keys(services)}
        renderItem={renderRow}
        keyExtractor={key => key}
        refreshControl={
          <RefreshControl
            refreshing={isScanning}
            onRefresh={refreshData}
            tintColor="skyblue"
          />
        }
      />
      <Footer nav={props} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    padding: 20,
    textAlign: 'center',
  },
  card: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  cardItem: {
    // width: wp('90%'),
    // height: 120,
    backgroundColor: '#ccc',
    borderTopColor: '#CCC',
    borderTopWidth: 1,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    //   alignItems: 'center',
  },
  json: {
    padding: 10,
  },
  state: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
  },
  ssid: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
  },
  list: {
    backgroundColor: 'white',
    color: 'white',
  },
});

export default NetworkDiscoverer;
