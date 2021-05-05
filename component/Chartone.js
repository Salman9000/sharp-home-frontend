import React, {useState} from 'react';
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

const ChartOne = props => {
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(true);
  const [button3, setButton3] = useState(false);
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

  const pressButton1 = () => {
    setButton1(true);
    setButton2(false);
    setButton3(false);
    setGraphData({
      labels: ['12', '1', '2', '3', '4', '5'],
      datasets: [
        {
          data: [
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
  };
  const pressButton2 = () => {
    setButton1(false);
    setButton2(true);
    setButton3(false);
    setGraphData({
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
  };
  const pressButton3 = () => {
    setButton1(false);
    setButton2(false);
    setButton3(true);
    setGraphData({
      labels: ['Week1', 'Week2', 'Week3', 'Week4'],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
          ],
        },
      ],
    });
  };
  return (
    <View style={styles.container1}>
      <Header title="Dashboard" />
      <ScrollView style={styles.container2}>
        <Title style={{alignSelf: 'center'}}>Total House Consumption</Title>
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
            7d
          </Button>
          <Button
            style={button3 ? styles.buttonOn : styles.buttonOff}
            mode={button3 ? 'contained' : 'text'}
            onPress={() => pressButton3()}>
            1month
          </Button>
        </View>
        <LineChart
          data={graphData}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
            borderRadius: 16,
          }}
        />
      </ScrollView>
      <Footer nav={props} />
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
export default ChartOne;
