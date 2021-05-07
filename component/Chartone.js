import React, {useState, useEffect} from 'react';
import {t} from 'react-native-tailwindcss';
import {Searchbar, Title, Button} from 'react-native-paper';
import Header from './Header';
import Footer from './Footer';
import {LineChart} from 'react-native-chart-kit';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import instance from '../helper';
import ApplianceChart from './ApplianceChart';
import Loading from './Loading';
const ChartOne = props => {
  const token = props.token;
  const [loading, setLoading] = useState(true);
  const [buttonArray, setButtonArray] = useState([
    {name: '1 Month', id: 0, selected: false, data: null},
    {name: '7 days', id: 1, selected: false, data: null},
    {name: 'Yesterday', id: 2, selected: false, data: null},
    {name: 'Today', id: 3, selected: true, data: null},
  ]);
  const [currentGraph, setCurrentGraph] = useState(3);
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    setButtonArray(
      buttonArray.map((element, i) => {
        element.data = null;
        element.selected = false;
        if (i == 3) {
          element.selected = true;
        }
        return element;
      }),
    );
    getGraphs('today').then(() => setRefreshing(false));
  }, []);
  // const [graphData, setGraphData] = useState({
  //   labels: [
  //     'Monday',
  //     'Tuesday',
  //     'Wednesday',
  //     'Thursday',
  //     'Friday',
  //     'Saturday',
  //     'Sunday',
  //   ],
  //   datasets: [
  //     {
  //       data: [
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //       ],
  //     },
  //   ],
  // });

  const getGraphs = async type => {
    switch (type) {
      case 'today':
        if (!buttonArray[3].data) {
          setLoading(true);
          const value = await instance(token).get(`/v1/activity/${type}`);
          // setGraphDataToday({
          //   labels: value.data.resultOneDay.inputArray.labels,
          //   datasets: [value.data.resultOneDay.inputArray.datasets],
          // });
          gData = {
            labels: value.data.resultOneDay.inputArray.labels,
            datasets: [value.data.resultOneDay.inputArray.datasets],
            consumption: value.data.resultOneDay.overallConsumption,
          };
          updateGraph(3, gData);
          // setConsumption(value.data.resultOneDay.overallConsumption);
          setLoading(false);
        }
        break;
      case '7days':
        if (!buttonArray[1].data) {
          setLoading(true);
          const value = await instance(token).get(`/v1/activity/${type}`);
          // setGraphData7Day({
          //   labels: value.data.result7Days.inputArray.labels,
          //   datasets: [value.data.result7Days.inputArray.datasets],
          // });
          gData = {
            labels: value.data.result7Days.inputArray.labels,
            datasets: [value.data.result7Days.inputArray.datasets],
            consumption: value.data.result7Days.overallConsumption,
          };
          // setGraphData(graphData7Day);
          console.log(gData);
          updateGraph(1, gData);
        }
        break;
      case '1month':
        if (!buttonArray[0].data) {
          setLoading(true);
          const value = await instance(token).get(`/v1/activity/${type}`);
          gData = {
            labels: value.data.result1Month.inputArray.labels,
            datasets: [value.data.result1Month.inputArray.datasets],
            consumption: value.data.result1Month.overallConsumption,
          };
          updateGraph(0, gData);
          setLoading(false);
        }
        break;
      case 'yesterday':
        if (!buttonArray[2].data) {
          setLoading(true);
          const value = await instance(token).get(`/v1/activity/${type}`);
          // setGraphDataYesterday({
          //   labels: value.data.resultOneDay.inputArray.labels,
          //   datasets: [value.data.resultOneDay.inputArray.datasets],
          // });

          gData = {
            labels: value.data.resultOneDay.inputArray.labels,
            datasets: [value.data.resultOneDay.inputArray.datasets],
            consumption: value.data.resultOneDay.overallConsumption,
          };
          console.log(gData);
          updateGraph(2, gData);
          setLoading(false);
        }
        break;
    }
  };
  useEffect(() => {
    getGraphs('today');
  }, []);

  const buttonPress = (id, name) => {
    console.log('btn pressed', id, name);
    setCurrentGraph(id);
    setButtonArray(
      buttonArray.map(value => {
        {
          value.id == id ? (value.selected = true) : (value.selected = false);
        }
        return value;
      }),
    );
    getGraphs(name);
  };

  const updateGraph = (id, graphDataButton) => {
    console.log(graphDataButton);
    setButtonArray(
      buttonArray.map(value => {
        {
          value.id == id && (value.data = graphDataButton);
        }
        return value;
      }),
    );
    setLoading(false);
  };
  return (
    <ScrollView
      style={styles.container2}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          loading={loading}
        />
      }>
      <Title style={{alignSelf: 'center'}}>Total House Consumption</Title>
      <View style={styles.buttonView}>
        {buttonArray &&
          buttonArray.map((btn, index) => {
            return (
              <Button
                key={index}
                style={!btn.selected ? styles.buttonOff : styles.buttonOn}
                mode={!btn.selected ? 'text' : 'contained'}
                onPress={() => {
                  buttonPress(
                    btn.id,
                    btn.name.split(' ').join('').toLowerCase(),
                  );
                }}>
                {btn.name}
              </Button>
            );
          })}
      </View>
      <View>
        {loading ? (
          <Loading />
        ) : (
          buttonArray
            .filter(value => value.selected == true)
            .map((element, index) => {
              console.log(element.data);
              return (
                <Text key={index}>
                  Overall Consumption {element.data.consumption}
                </Text>
              );
            })
        )}
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView horizontal={true}>
          {buttonArray
            .filter(value => value.selected == true)
            .map((element, index) => {
              if (element.data)
                return (
                  <LineChart
                    data={element.data}
                    key={index}
                    width={wp('150%')} // from react-native
                    height={hp('40%')}
                    yAxisLabel=""
                    withInnerLines={false}
                    withOuterLines={false}
                    withVerticalLines={false}
                    withHorizontalLines={false}
                    withHorizontalLabels={false}
                    yAxisLabel=""
                    yAxisSuffix=""
                    withInnerLines={false}
                    withOuterLines={false}
                    yAxisInterval={4} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: '#4050B5',
                      backgroundGradientFrom: '#4050B5',
                      backgroundGradientTo: '#4050C4',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 0.5) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 0,
                      },
                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        // stroke: '#ffa726',
                      },
                    }}
                    bezier
                    style={{
                      borderBottomRightRadius: 15,
                      paddingRight: 10,
                    }}
                  />
                );
            })}
        </ScrollView>
      )}

      <ApplianceChart {...props} token={token} />
    </ScrollView>
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
    // width: wp('95%'),
    margin: 0,
  },
});
export default ChartOne;
