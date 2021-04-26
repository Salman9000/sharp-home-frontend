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
const Signup = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Password2, setPassword2] = useState('');
  const onChangeText = text => setText(text);

  const hasErrors = () => {
    return !text.includes('@');
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
            onPress={() => Enterhouse(email, password)}>
            New Residence
          </Button>

          <Button
            style={styles.button2}
            mode="contained"
            onPress={() => navigation.navigate('Login')}>
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
