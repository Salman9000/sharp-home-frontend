import React, {useEffect} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  // AsyncStorage
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = props => {
  console.log('mewo');
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token) {
      props.navigation.navigate('home');
    } else {
      props.navigation.push('Login');
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
