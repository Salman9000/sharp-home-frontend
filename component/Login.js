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
} from 'react-native';
import {HelperText, TextInput, Button} from 'react-native-paper';
import Header from './Header';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const onChangeText = text => setText(text);

  const hasErrors = () => {
    return !text.includes('@');
  };

  return (
    <View style={styles.container}>
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
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={password}
            placeholder="Password"
            // secureTextEntry={true}
            placeholderTextColor="#ffffff"
            onChangeText={(pass) => setpassword(pass)}
          />
        </View>
      </View>
      <View style={styles.otherboxes2}>
        <Button
          style={styles.button1}
          mode="contained"
          onPress={() => Enterhouse(email, password)}>
          Enter The House
        </Button>

        <Button
          style={styles.button2}
          mode="contained"
          onPress={() => navigation.navigate('Signup')}>
          New Residence
        </Button>
      </View>
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
  },
  otherboxes: {
    flex: 1,
    width: '100%',
    marginTop: 50,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  otherboxes2: {
    flex: 1,
    width: '100%',
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
