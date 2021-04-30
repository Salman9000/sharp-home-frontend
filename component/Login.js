import React, {useState} from 'react';
import {getIp} from '../helper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {HelperText, TextInput, Button} from 'react-native-paper';
import Header from './Header';
const axios = require('axios');
import Storage from './Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const onChangeText = text => setText(text);

  const hasErrors = ({navigation}) => {
    return !text.includes('@');
  };

  const Enterhouse = (email, password, props) => {
    // console.log(email, password);

    axios
      .post(`http://192.168.1.122:3000/v1/auth/login`, {
        email: email,
        password: password,
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        // ADD THIS THROW error
      })
      .then(function (response) {
        AsyncStorage.setItem('token', response.data.tokens.access.token);
        Storage.storeToken(response.data.tokens.access.token);
        // console.log(response.data.tokens.access.token);
        props.navigation.replace('home');
        // console.log();
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.top}>
          <Text style={styles.Text}>Smart Home</Text>
        </View>
        <View style={styles.otherboxes}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={email}
              placeholder="Email"
              selectionColor="white"
              placeholderTextColor="#ffffff"
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#ffffff"
              onChangeText={pass => setpassword(pass)}
            />
          </View>
        </View>
        <View style={styles.otherboxes2}>
          <Button
            style={styles.button1}
            mode="contained"
            onPress={() => Enterhouse(email, password, props)}>
            Enter The House
          </Button>

          <Button
            style={styles.button2}
            mode="contained"
            onPress={() => navigation.navigate('Signup')}>
            New Residence
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#003f5c',
  },
  inputView: {
    backgroundColor: '#003f5c',
    // borderRadius: 30,
    width: wp('100%'),
    height: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    width: wp('100%'),
    flex: 1,
    fontSize: 20,
    alignItems: 'flex-start',
    backgroundColor: '#003f5c',
  },
  Text: {
    color: 'white',
    fontSize: 24,
  },
  top: {
    marginTop: 80,
    alignItems: 'center',
  },
  otherboxes: {
    height: hp('50%'),
    width: wp('100%'),
    marginTop: 50,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  otherboxes2: {
    height: hp('20%'),
    width: wp('100%'),
    marginTop: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    // flex: 1,
    width: '80%',
    marginBottom: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EC3726',
  },
  button2: {
    width: '80%',
    marginBottom: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#42A4FE',
  },
});
export default Login;
