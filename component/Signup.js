import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {HelperText, TextInput, Button} from 'react-native-paper';
import Header from './Header';
import instance from '../helper';
const axios = require('axios');
import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Signup = props => {
  const [name, Setname] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Password2, setPassword2] = useState('');
  const onChangeText = text => setText(text);

  const hasErrors = () => {
    return !text.includes('@');
  };
  const signup = async props => {
    try {
      if (
        name.length == 0 ||
        Email.length == 0 ||
        Password.length == 0 ||
        Password2.length == 0
      ) {
        alert('Please fill all details correctly');
        // break;
      } else if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          Email,
        )
      ) {
        if (Password.length < 8 || Password2.length < 8) {
          alert('Passwords must be at least 8 characters');
        } else if (Password != Password2) {
          alert('Both passwords do not match');
        } else {
          const response = await axios.post(`${BASE_URL}/v1/auth/register`, {
            name: name,
            email: Email,
            password: Password,
          });
          await AsyncStorage.setItem(
            'token',
            response.data.tokens.access.token,
          );
          props.setToken(response.data.tokens.access.token);
          props.navigation.navigate('home');
        }
      } else {
        alert('Email address not appropriate');
      }
    } catch (error) {
      console.log(
        'There has been a problem with your fetch operation in registering: ' +
          error.message,
      );
    }
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
              value={name}
              placeholder="Full Name"
              selectionColor="white"
              placeholderTextColor="#ffffff"
              onChangeText={name => Setname(name)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={Email}
              placeholder="Email"
              selectionColor="white"
              placeholderTextColor="#ffffff"
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={Password}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#ffffff"
              onChangeText={password => setPassword(password)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={Password2}
              placeholder="Retype Password"
              secureTextEntry={true}
              placeholderTextColor="#ffffff"
              onChangeText={password2 => setPassword2(password2)}
            />
          </View>
        </View>

        <View style={styles.otherboxes2}>
          <Button
            style={styles.button1}
            mode="contained"
            onPress={() => signup(props)}>
            New Residence
          </Button>

          <Button
            style={styles.button2}
            mode="contained"
            onPress={() => props.navigation.navigate('Login')}>
            Already Have a Residence
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
    width: '100%',
    height: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    width: '100%',

    fontSize: 20,
    alignItems: 'flex-start',
    backgroundColor: '#003f5c',
  },
  Text: {
    color: 'white',
    fontSize: 24,
  },
  top: {
    height: hp('10%'),
    marginTop: 80,
    alignItems: 'center',
  },
  otherboxes: {
    height: hp('50%'),
    width: '100%',
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
export default Signup;
