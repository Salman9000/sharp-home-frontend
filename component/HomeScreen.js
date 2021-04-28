import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';

const HomeScreen = props => {
  const [email, setEmail] = useState('loading');
  //    const Boiler = async ()=>{
  //       const token = await AsyncStorage.getItem("token")
  //     fetch('http://10.0.2.2:3000/',{
  //     headers:new Headers({
  //       Authorization:"Bearer "+token
  //     })
  //     }).then(res=>res.json())
  //     .then(data=>{
  //       console.log(data)
  //       setEmail(data.email)
  //     }
  //     )
  //    }
  // useEffect(()=>{
  //    Boiler()
  // },[])

  const logout = props => {
    AsyncStorage.removeItem('token').then(() => {
      props.navigation.replace('Login');
    });
  };

  const addDeviceButton = () => {};
  return (
    <View styles={styles.screen}>
      <Header title="Welcome" />
      <TouchableOpacity
        onPress={() => {
          addDeviceButton();
        }}
        style={styles.addDeviceButton}>
        <Text>I'm a button</Text>
      </TouchableOpacity>
      <Button
        mode="contained"
        style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
        onPress={() => logout(props)}>
        logout
      </Button>
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
});
