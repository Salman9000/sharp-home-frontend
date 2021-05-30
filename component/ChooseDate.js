import React, {useState, useEffect} from 'react';
import {Searchbar, Title, Button} from 'react-native-paper';
import Header from './Header';
import Footer from './Footer';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
// import DateRangePicker from 'react-native-daterange-picker';
import DatePicker from 'react-native-date-picker';

const ChooseDate = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <View style={styles.scroll}>
      <Header
        title="Choose Date"
        nav={props.navigation}
        buttonsEnabled={true}
      />
      <View style={styles.container}>
        <Text style={styles.container2}>Start Date</Text>
        <DatePicker date={startDate} onDateChange={setStartDate} mode="date" />
        <Text style={styles.container2}>End Date</Text>
        <DatePicker
          minimumDate={new Date(startDate)}
          date={endDate}
          onDateChange={setEndDate}
          mode="date"
        />
        <Button
          mode="contained"
          uppercase={false}
          style={{
            color: 'white',
            backgroundColor: '#42A4FE',
            marginHorizontal: 30,
            marginBottom: 30,
            marginTop: 20,
          }}
          contentStyle={{height: 50}}
          labelStyle={{fontSize: 18}}
          dark={true}
          onPress={() => {
            props.navigation.push('vrRooms', {
              deviceParams: props.route.params.deviceParams,
              roomsArray: props.route.params.roomsArray,
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
              roomSelect: props.route.params.roomSelect,
              deviceSelect: props.route.params.deviceSelect,
            });
          }}>
          Confirm Dates
        </Button>
      </View>
      <Footer nav={props} />
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },

  scrollv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView1: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 50,
    marginHorizontal: 30,
    paddingTop: 10,
  },
  button1: {
    display: 'flex',
    borderRadius: 4,
    backgroundColor: '#000',
    color: '#FFF',
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 18,
  },
});
export default ChooseDate;
