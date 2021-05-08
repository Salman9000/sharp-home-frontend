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
import Loading from './Loading';

const ApplianceChart = props => {
  const token = props.token;
  const [loading, setLoading] = useState(true);
  const [buttonArray, setButtonArray] = useState([
    {name: '1 Month', api: '1month', id: 0, selected: false, data: null},
    {name: '7 days', api: '7days', id: 1, selected: false, data: null},
    {
      name: 'Yesterday',
      api: 'OneDay/yesterday',
      id: 2,
      selected: false,
      data: null,
    },
    {name: 'Today', api: 'OneDay/today', id: 3, selected: true, data: null},
  ]);
  const [currentGraph, setCurrentGraph] = useState(3);
  const [refreshing, setRefreshing] = useState(false);
  const colorArray = [
    (opacity = 1) => `rgba(255,0,0,${opacity})`,
    (opacity = 1) => `rgba(0,0,102, ${opacity})`,
    (opacity = 1) => `rgba(0,102,0, ${opacity})`,
  ];
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
    getGraphs('OneDay/today').then(() => setRefreshing(false));
  }, []);

  const getGraphs = async type => {
    switch (type) {
      case 'OneDay/today':
        if (!buttonArray[3].data) {
          setLoading(true);
          const value = await instance(token).get(
            `/v1/devices/getDeviceConsumptionBy` + type,
          );
          for (var i in value.data.resultConsumption.inputArray.datasets) {
            value.data.resultConsumption.inputArray.datasets[i].color =
              colorArray[i];
          }
          gData = {
            labels: value.data.resultConsumption.inputArray.labels,
            datasets: value.data.resultConsumption.inputArray.datasets,
            legend: value.data.resultConsumption.deviceName,
          };
          updateGraph(3, gData);
          setLoading(false);
        }
        break;
      case '7days':
        if (!buttonArray[1].data) {
          setLoading(true);
          const value = await instance(token).get(
            `/v1/devices/getDeviceConsumptionBy` + type,
          );
          for (var i in value.data.resultConsumption.inputArray.datasets) {
            value.data.resultConsumption.inputArray.datasets[i].color =
              colorArray[i];
          }
          gData = {
            labels: value.data.resultConsumption.inputArray.labels,
            datasets: value.data.resultConsumption.inputArray.datasets,
            legend: value.data.resultConsumption.deviceName,
          };
          updateGraph(1, gData);
          setLoading(false);
        }
        break;
      case '1month':
        if (!buttonArray[0].data) {
          setLoading(true);
          const value = await instance(token).get(
            `/v1/devices/getDeviceConsumptionBy` + type,
          );
          for (var i in value.data.resultConsumption.inputArray.datasets) {
            value.data.resultConsumption.inputArray.datasets[i].color =
              colorArray[i];
          }
          gData = {
            labels: value.data.resultConsumption.inputArray.labels,
            datasets: value.data.resultConsumption.inputArray.datasets,
            legend: value.data.resultConsumption.deviceName,
          };
          updateGraph(0, gData);

          setLoading(false);
        }
      case 'OneDay/yesterday':
        if (!buttonArray[2].data) {
          setLoading(true);
          const value = await instance(token).get(
            `/v1/devices/getDeviceConsumptionBy` + type,
          );
          for (var i in value.data.resultConsumption.inputArray.datasets) {
            value.data.resultConsumption.inputArray.datasets[i].color =
              colorArray[i];
          }
          gData = {
            labels: value.data.resultConsumption.inputArray.labels,
            datasets: value.data.resultConsumption.inputArray.datasets,
            legend: value.data.resultConsumption.deviceName,
          };
          updateGraph(2, gData);

          setLoading(false);
        }
    }
  };
  const color = () => {
    return (opacity = 1) => `rgba(255,0,0,${opacity})`;
  };
  useEffect(() => {
    // console.log(graphData.datasets[0]);
    getGraphs('OneDay/today');
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
    <View>
      <Title style={{alignSelf: 'center'}}>Appliance Consumption</Title>
      <View style={styles.buttonView}>
        {buttonArray &&
          buttonArray.map((btn, index) => {
            return (
              <Button
                key={index}
                style={!btn.selected ? styles.buttonOff : styles.buttonOn}
                mode={!btn.selected ? 'text' : 'contained'}
                onPress={() => {
                  buttonPress(btn.id, btn.api);
                }}>
                {btn.name}
              </Button>
            );
          })}
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
                    yAxisSuffix="KW"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: '#4050B5',
                      backgroundGradientFrom: '#4050B5',
                      backgroundGradientTo: '#4050C4',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
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
                );
            })}
        </ScrollView>
      )}
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
