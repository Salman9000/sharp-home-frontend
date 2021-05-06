import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {Button, Text, Icon} from 'native-base';

const ConfirmDeviceDetails = props => {
  const confirmButtonPressed = props => {
    alert('room added');
    // props.navigation.replace('addRoom');
  };
  const styles = StyleSheet.create({});
  return (
    <View style={styles.container1}>
      <Header title="Confirm Room" />
      <ScrollView>
        <View>
          <Text>Hello</Text>
        </View>
      </ScrollView>
      <Footer nav={props} />
    </View>
  );
};

export default ConfirmDeviceDetails;
