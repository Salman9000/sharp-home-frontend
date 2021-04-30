import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {IconButton, Colors} from 'react-native-paper';
import {Button, Text, Icon} from 'native-base';

const NoRoom = props => {
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
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: '#1e90ff',
    },
  });
  return (
    <View style={styles.scroll}>
      <Header title="Add A Room" />
      <View style={styles.scrollv}>
        <Button
          style={styles.iconContainer}
          onPress={() => console.log('Pressed')}>
          <Icon name="add" />
        </Button>
      </View>
      <Footer nav={props} />
    </View>
  );
};

export default NoRoom;
