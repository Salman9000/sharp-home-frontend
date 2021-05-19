import React, {Component} from 'react';
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import SelectDevices from './SelectDevices';

const zeroconf = new Zeroconf();

export default class networkDiscoverer extends Component {
  state = {
    isScanning: false,
    selectedService: null,
    services: {},
    deviceName: this.props.route.params.deviceName,
    deviceRating: this.props.route.params.deviceRating,
    roomId: this.props.route.params.roomId,
  };

  componentDidMount() {
    this.refreshData();
    // const {deviceName, deviceRating, roomId} = this.props.route.params;
    // console.log(deviceName, 'hh');
    zeroconf.on('start', () => {
      this.setState({isScanning: true});
      console.log('[Start]');
    });

    zeroconf.on('stop', () => {
      this.setState({isScanning: false});
      console.log('[Stop]');
    });

    zeroconf.on('resolved', service => {
      // console.log('[Resolve]', JSON.stringify(service, null, 2));

      this.setState({
        services: {
          ...this.state.services,
          [service.host]: service,
        },
      });
    });

    zeroconf.on('error', err => {
      this.setState({isScanning: false});
      console.log('[Error]', err);
    });
  }
  SelectDevice = (host, name) => {
    console.log(this.state.roomId);
    this.props.navigation.navigate('confirmDeviceDetails', {
      deviceName: this.state.deviceName,
      deviceRating: this.state.deviceRating,
      roomId: this.state.roomId,
      host: host,
      name: name,
    });
  };

  renderRow = ({item, index}) => {
    const {name, fullName, host} = this.state.services[item];

    return (
      <TouchableOpacity
        style={styles.list}
        onPress={() => this.SelectDevice(host, name)}>
        <Card style={styles.card} pointerEvents="none">
          <CardItem header>
            <Left>
              <Text style={styles.roomName}>{name}</Text>
            </Left>
            <Right>
              <Text style={styles.deviceCount}> {host}</Text>
            </Right>
          </CardItem>
        </Card>
        {/* <ListItem title={name} subtitle={fullName} /> */}
      </TouchableOpacity>
    );
  };

  refreshData = () => {
    const {isScanning} = this.state;
    if (isScanning) {
      return;
    }

    this.setState({services: []});

    zeroconf.scan('http', 'tcp', 'local.');

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      zeroconf.stop();
    }, 5000);
  };

  render() {
    const {services, selectedService, isScanning} = this.state;
    // console.log(selectedService, 'kkk');

    const service = services[selectedService];

    if (service) {
      return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={() => this.setState({selectedService: null})}>
            <Text style={styles.closeButton}>{'CLOSE'}</Text>
          </TouchableOpacity>

          <Text style={styles.json}>{JSON.stringify(services, null, 2)}</Text>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.state}>
          {isScanning ? 'Scanning for Devices' : 'Scanning Stopped'}
        </Text>

        <FlatList
          data={Object.keys(services)}
          renderItem={this.renderRow}
          keyExtractor={key => key}
          refreshControl={
            <RefreshControl
              refreshing={isScanning}
              onRefresh={this.refreshData}
              tintColor="skyblue"
            />
          }
        />
        <Footer nav={this.props} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
  closeButton: {
    padding: 20,
    textAlign: 'center',
  },
  card: {
    marginTop: 20,
  },
  cardItem: {
    width: wp('90%'),
    height: 120,

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
  list: {
    color: 'black',
    backgroundColor: '#DDDDDD',
  },
});
