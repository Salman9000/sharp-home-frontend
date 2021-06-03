import React from 'react';
import {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Provider, Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
import DropDown from 'react-native-paper-dropdown';

const AddDevice = props => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [range, setRange] = useState();
  const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   {label: 'Apple', value: 'apple'},
  //   {label: 'Banana', value: 'banana'},
  // ]);
  const [items, setItems] = useState([
    {
      label: 'Light/Bulb',
      keys: [
        {
          startTime: '18',
          endTime: '3',
        },
      ],
      value: 0,
    },
    {
      label: 'Fan',
      keys: [
        {
          startTime: '18',
          endTime: '2',
        },
      ],
      value: 1,
    },
    {
      label: 'A/C',
      keys: [
        {
          startTime: '21',
          endTime: '9',
        },
      ],
      value: 2,
    },
    {
      label: 'Kitchen Appliances',
      keys: [
        {
          startTime: '11',
          endTime: '15',
        },
        {
          startTime: '19',
          endTime: '23',
        },
      ],
      value: 3,
    },
  ]);
  useEffect(() => {
    if (value) {
      console.log();
      setRange(items[value].keys);
    }
  }, [value]);

  const chooseRoom = props => {
    if (name.length === 0 || rating.length === 0) {
      alert('Name and Rating are compulsory!');
    } else {
      props.navigation.push('chooseRoom', {
        deviceName: name,
        deviceRating: rating,
        range: range,
      });
    }
  };

  const genderList = [
    {label: 'Male', value: 'male'},

    {label: 'Female', value: 'female'},

    {label: 'Others', value: 'others'},
  ];

  return (
    <Provider>
      <View style={styles.container1}>
        <Header
          title="Add a Device"
          nav={props.navigation}
          buttonsEnabled={true}
        />
        <View style={styles.container2}>
          <View style={styles.otherboxes}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                value={name}
                placeholder="Device Name"
                selectionColor="black"
                placeholderTextColor="#AAA"
                underlineColorAndroid="#D2D6DE"
                onChangeText={name => setName(name)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                value={rating}
                placeholder="Rating in Watts"
                selectionColor="black"
                placeholderTextColor="#AAA"
                underlineColorAndroid="#D2D6DE"
                onChangeText={rating => setRating(rating)}
              />
            </View>
            <SafeAreaView style={styles.containerStyle}>
              <DropDown
                label={'Gender'}
                mode={'outlined'}
                value={value}
                setValue={setValue}
                list={items}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }}
              />
            </SafeAreaView>
          </View>
          <View style={styles.otherboxes2}>
            <Button
              style={styles.button1}
              mode="contained"
              onPress={() => {
                chooseRoom(props);
              }}>
              Choose Room
            </Button>
          </View>
        </View>
        <Footer nav={props} />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#F4F5F8',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
  },
  inputView: {
    // backgroundColor: 'white',
    width: wp('90%'),
    height: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  containerStyle: {
    flex: 1,
    width: wp('80%'),
    marginHorizontal: 20,

    justifyContent: 'center',
  },
  TextInput: {
    height: 50,
    width: wp('90%'),
    flex: 1,
    fontSize: 18,
    alignItems: 'flex-start',
    paddingLeft: 20,
    color: 'black',
    backgroundColor: '#F4F5F8',
  },
  otherboxes: {
    height: hp('50%'),
    width: wp('90%'),
    marginTop: 50,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  otherboxes2: {
    height: hp('20%'),
    width: wp('100%'),
    flexDirection: 'column',
    alignItems: 'center',
  },
  button1: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#42A4FE',
  },
});
export default AddDevice;
