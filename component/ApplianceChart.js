import React, {useState, useEffect} from 'react';
import {t} from 'react-native-tailwindcss';
import {Searchbar, Title, Button} from 'react-native-paper';
import Header from './Header';
import Footer from './Footer';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions, StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import instance from '../helper';

const ApplianceChart = props => {
  const token = props.token;
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(true);
  const [button3, setButton3] = useState(false);
  const [button4, setButton4] = useState(false);
  const [consumption, setConsumption] = useState(0);
  const [graphData, setGraphData] = useState({
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  });

  const getGraphs = async type => {
    const value = await instance(token).get(
      `/v1/devices/getDeviceConsumptionBy` + type,
    );

    console.log(value.data);
    if (type === '1Month') {
      console.log(value.data);
      setGraphData({
        labels: value.data.result1Month.inputArray.labels,
        datasets: value.data.result1Month.inputArray.datasets,
      });
      // setConsumption(value.data.result1Month.overallConsumption);
    } else if (type === '7Days') {
      setGraphData({
        labels: value.data.result7Days.inputArray.labels,
        datasets: [value.data.result7Days.inputArray.datasets],
      });
      setButton2(true);
      // console.log(value.data.result7Days.overallConsumption);
      setConsumption(value.data.result7Days.overallConsumption);
    } else if (type === 'Yesterday' || type === 'Today') {
      setGraphData({
        labels: value.data.resultOneDay.inputArray.labels,
        datasets: [value.data.resultOneDay.inputArray.datasets],
      });
      setConsumption(value.data.resultOneDay.overallConsumption);
    }
    // console.log(value.data.result7days);
  };
  useEffect(() => {
    getGraphs('1Month');
  }, []);

  const pressButton1 = () => {
    setButton1(true);
    setButton2(false);
    setButton3(false);
    setButton4(false);
    // getGraphs('Today');
  };
  const pressButton2 = () => {
    setButton1(false);
    setButton2(true);
    setButton3(false);
    setButton4(false);
    // getGraphs('7Days');
  };
  const pressButton3 = () => {
    setButton1(false);
    setButton2(false);
    setButton3(true);
    setButton4(false);
    getGraphs('1Month');
  };
  const pressButton4 = () => {
    setButton1(false);
    setButton2(false);
    setButton3(false);
    setButton4(true);
    // getGraphs('Yesterday');
  };
  return (
    <View>
      <Title style={{alignSelf: 'center'}}>Appliance Consumption</Title>
      <View style={styles.buttonView}>
        <Button
          style={button1 ? styles.buttonOn : styles.buttonOff}
          mode={button1 ? 'contained' : 'text'}
          onPress={() => pressButton1()}>
          Today
        </Button>
        <Button
          style={button2 ? styles.buttonOn : styles.buttonOff}
          mode={button2 ? 'contained' : 'text'}
          onPress={() => pressButton2()}>
          7 Days
        </Button>
        <Button
          style={button3 ? styles.buttonOn : styles.buttonOff}
          mode={button3 ? 'contained' : 'text'}
          onPress={() => pressButton3()}>
          1 month
        </Button>
        <Button
          style={button4 ? styles.buttonOn : styles.buttonOff}
          mode={button4 ? 'contained' : 'text'}
          onPress={() => pressButton4()}>
          Yesterday
        </Button>
      </View>
      <ScrollView horizontal={true}>
        <LineChart
          data={graphData}
          width={wp('150%')} // from react-native
          height={hp('40%')}
          yAxisLabel=""
          yAxisSuffix="KW"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#4050B5',
            backgroundGradientFrom: '#4050B5',
            backgroundGradientTo: '#4050C4',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 20,
          }}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 50,
    marginHorizontal: 10,
  },
  button: {
    width: 20,
  },
  buttonOn: {
    borderRadius: 50,
    backgroundColor: 'blue',
  },
  buttonOff: {},
  container1: {
    flex: 1,
  },
  container2: {
    flex: 1,
    width: wp('95%'),
    margin: 10,
  },
});

export default ApplianceChart;
