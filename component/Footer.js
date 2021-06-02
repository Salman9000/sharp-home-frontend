import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {Footer as F, FooterTab, Button, Icon, Text} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Footer = props => {
  const styles = StyleSheet.create({
    barIcon: {color: 'white', padding: 1, fontSize: 22},
  });

  const logout = navigation => {
    AsyncStorage.removeItem('token').then(() => {
      navigation.navigate('Login');
    });
  };
  const chartOne = navigation => {
    navigation.navigate('Chartone');
  };

  return (
    <F>
      <FooterTab>
        <Button
          vertical
          active
          onPress={() => props.nav.navigation.navigate('home')}>
          <Icon name="home" />
          <Text>Home</Text>
        </Button>
        <Button
          vertical
          active
          onPress={() => {
            props.nav.navigation.push('vrChooseRoomAndDevice', {
              roomSelect: false,
              deviceSelect: false,
            });
          }}>
          <Entypo name="bar-graph" style={styles.barIcon} />
          <Text>Analy</Text>
        </Button>
        <Button
          vertical
          active
          onPress={() => {
            props.nav.navigation.navigate('viewDevices');
          }}>
          <Icon active name="navigate" />
          <Text>Devices</Text>
        </Button>
        <Button
          vertical
          active
          onPress={() => {
            props.nav.navigation.navigate('viewRooms');
          }}>
          <Icon active name="navigate" />
          <Text>Rooms</Text>
        </Button>
        <Button
          vertical
          active
          onPress={() => {
            logout(props.nav.navigation);
          }}>
          <Icon name="person" />
          <Text>Log Out</Text>
        </Button>
      </FooterTab>
    </F>
  );
};
export default Footer;
