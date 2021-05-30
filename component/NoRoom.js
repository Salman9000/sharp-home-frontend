import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {Button, Text, Icon} from 'native-base';

const NoRoom = props => {
  const addRoomButtonPressed = props => {
    props.navigation.push('addRoom');
  };
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
    icon: {
      fontSize: 40,
    },
    text: {
      fontSize: 40,
    },
  });
  return (
    <View style={styles.scroll}>
      <Header title="Rooms" nav={props.navigation} buttonsEnabled={true} />
      <View style={styles.scrollv}>
        <Text style={styles.text}>No Rooms</Text>
        <Text style={styles.text}>Found</Text>
        <Button
          style={styles.iconContainer}
          onPress={() => addRoomButtonPressed(props)}>
          <Icon name="add" style={styles.icon} />
        </Button>
      </View>
      <Footer nav={props} />
    </View>
  );
};

export default NoRoom;
