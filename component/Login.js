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
  Modal,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput, Button} from 'react-native-paper';
import Loading from './Loading';
const axios = require('axios');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '@env';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const onChangeText = text => setText(text);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const Enterhouse = async (email, password, props) => {
    setErrorMessage(false);
    setModalVisible(true);
    setLoading(true);
    try {
      console.log(BASE_URL);
      const response = await axios.post(`${BASE_URL}/v1/auth/login`, {
        email: 'test2@test.com',
        password: 'test1234',
        // email: 'test3@test.com',
        // password: 'test1234',
        // email: 'test@test.com',
        // password: 'test1234',
        // email: 'rasheedaabbas@gmail.com',
        // password: 'rashi123',
        // email: email,
        // password: password,
      });
      // console.log(response.data.tokens.access.token);
      await AsyncStorage.setItem('token', response.data.tokens.access.token);
      props.setToken(response.data.tokens.access.token);
      props.navigation.navigate('home');
      setLoading(false);
      setModalVisible(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(true);
      console.log(
        'There has been a problem with your fetch operation in enterhouse login: ' +
          error.message,
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          animationType={'fade'}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {loading && <Loading style={'no style'} />}
              {errorMessage && (
                <View>
                  <Text style={{marginVertical: 15}}>
                    Error logging in. Please try again later
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
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
              Type="outlined"
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
            onPress={() => props.navigation.navigate('Signup')}>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Login;
