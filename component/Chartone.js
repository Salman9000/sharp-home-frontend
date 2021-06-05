import React, {useState, useEffect} from 'react';
import {t} from 'react-native-tailwindcss';
import {Searchbar, Title, Button} from 'react-native-paper';
import Header from './Header';
import Footer from './Footer';
import {LineChart} from 'react-native-chart-kit';
import FlashMessage, {showMessage} from 'react-native-flash-message';
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
    {
      dName: '1m',
      name: '1 Month',
      id: 0,
      selected: false,
      data: null,
      width: '100%',
    },
    {
      dName: '7d',
      name: '7 Days',
      id: 1,
      selected: false,
      data: null,
      width: '100%',
    },
    {
      dName: 'Y',
      name: 'Yesterday',
      id: 2,
      selected: false,
      data: null,
      width: '200%',
    },
    {
      dName: 'T',
      name: 'Today',
      id: 3,
      selected: true,
      data: null,
      width: '200%',
    },
  ]);
  const [currentGraph, setCurrentGraph] = useState(3);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
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

  const getGraphs = async type => {
    try {
      switch (type) {
        case 'today':
          if (!buttonArray[3].data) {
            setLoading(true);
            const value = await instance(token).get(`/v1/activity/${type}`);
            (value.data.resultOneDay.inputArray.datasets.color = (
              opacity = 1,
            ) => 'rgba(0,255,255, 1)'),
              (gData = {
                labels: value.data.resultOneDay.inputArray.labels,
                datasets: [value.data.resultOneDay.inputArray.datasets],
                consumption: value.data.resultOneDay.overallConsumption,
                startDate: value.data.startDate,
                endDate: null,
              });

            updateGraph(3, gData);
            setLoading(false);
          }
          break;
        case '7days':
          if (!buttonArray[1].data) {
            setLoading(true);
            const value = await instance(token).get(`/v1/activity/${type}`);
            (value.data.result7Days.inputArray.datasets.color = (opacity = 1) =>
              'rgba(0,255,255, 1)'),
              (gData = {
                labels: value.data.result7Days.inputArray.labels,
                datasets: [value.data.result7Days.inputArray.datasets],
                consumption: value.data.result7Days.overallConsumption,
                startDate: value.data.startDate,
                endDate: value.data.endDate,
              });
            updateGraph(1, gData);
          }
          break;
        case '1month':
          if (!buttonArray[0].data) {
            setLoading(true);
            const value = await instance(token).get(`/v1/activity/${type}`);
            (value.data.result1Month.inputArray.datasets.color = (
              opacity = 1,
            ) => 'rgba(0,255,255, 1)'),
              (gData = {
                labels: value.data.result1Month.inputArray.labels,
                datasets: [value.data.result1Month.inputArray.datasets],
                consumption: value.data.result1Month.overallConsumption,
                startDate: value.data.startDate,
                endDate: value.data.endDate,
              });
            updateGraph(0, gData);
            setLoading(false);
          }
          break;
        case 'yesterday':
          if (!buttonArray[2].data) {
            setLoading(true);
            const value = await instance(token).get(`/v1/activity/${type}`);
            (value.data.resultOneDay.inputArray.datasets.color = (
              opacity = 1,
            ) => 'rgba(0,255,255, 1)'),
              (gData = {
                labels: value.data.resultOneDay.inputArray.labels,
                datasets: [value.data.resultOneDay.inputArray.datasets],
                consumption: value.data.resultOneDay.overallConsumption,
                startDate: value.data.startDate,
                endDate: null,
              });
            updateGraph(2, gData);
            setLoading(false);
          }
          break;
      }
    } catch (error) {
      // console.log(error, 'aaaaaaaaaaaaaaaaaaaaaaaaaa');
      setErrorMessage('No Data Found');
      setLoading(false);
    }
  };
  useEffect(() => {
    getGraphs('today');
  }, []);

  const buttonPress = (id, name) => {
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
    <View
      style={styles.container2}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          loading={loading}
        />
      }>
      <Title style={{alignSelf: 'center', color: 'white', marginBottom: 20}}>
        Total House Consumption
      </Title>
      <View style={styles.buttonView}>
        {buttonArray &&
          buttonArray.map((btn, index) => {
            return (
              <Button
                color={'white'}
                key={index}
                style={!btn.selected ? styles.buttonOff : styles.buttonOn}
                mode={!btn.selected ? 'text' : 'contained'}
                dark={true}
                onPress={() => {
                  buttonPress(
                    btn.id,
                    btn.name.split(' ').join('').toLowerCase(),
                  );
                }}>
                {btn.dName}
              </Button>
            );
          })}
      </View>
      {loading ? (
        <Text></Text>
      ) : errorMessage ? (
        <Title
          style={{
            alignSelf: 'center',
            color: 'black',
          }}>
          No Data Found
        </Title>
      ) : (
        buttonArray
          .filter(value => value.selected == true)
          .map((element, index) => {
            if (!element.data.endDate) {
              return (
                <Text
                  key={index}
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontSize: 18,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    marginBottom: 10,
                    marginTop: 10,
                  }}>
                  {element.data.startDate}
                </Text>
              );
            } else {
              return (
                <Text
                  key={index}
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontSize: 18,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    marginBottom: 10,
                    marginTop: 10,
                  }}>
                  {element.data.endDate} - {element.data.startDate}
                </Text>
              );
            }
          })
      )}
      <View>
        {loading ? (
          <Text></Text>
        ) : (
          buttonArray
            .filter(value => value.selected == true)
            .map((element, index) => {
              return (
                <Title
                  key={index}
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    color: 'white',
                    marginVertical: 20,
                    paddingTop: 5,
                    height: 36,
                    fontSize: 36,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                  }}>
                  {element.data.consumption}/Kw
                </Title>
              );
            })
        )}
        <FlashMessage
          autoHide={false}
          style={{
            width: 150,
            backgroundColor: '#3B6ACA',
            borderRadius: 50,
          }}
          titleStyle={{
            fontSize: 24,
            paddingTop: 11,
            alignSelf: 'center', // Centered horizontally
            color: '#46D3E6',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
          }}
          floating={true}
          position="center"
        />
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
                    width={wp(element.width)} // from react-native
                    height={hp('30%')}
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
                    onDataPointClick={({value, getColor}) =>
                      showMessage({
                        message: `${value}/Kw`,
                        backgroundColor: 'red',
                      })
                    }
                    chartConfig={{
                      // backgroundColor: 'red',
                      backgroundGradientFrom: '#4048CC',
                      backgroundGradientTo: '#4048CC',
                      fillShadowGradientOpacity: 1,
                      fillShadowGradient: '#6493D1',
                      strokeWidth: 2,
                      // backgroundGradientFromOpacity: 0,
                      // backgroundGradientToOpacity: 0,
                      decimalPlaces: 2, // optional, defaults to 2dp
                      // color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255,255,255, ${opacity})`,
                      style: {
                        borderRadius: 0,
                      },
                      propsForDots: {
                        r: '2',
                        strokeWidth: '4',
                        // stroke: '#ffa726',
                      },
                      propsForBackgroundLines: {
                        stroke: '#ffffff',
                      },
                    }}
                    bezier
                    style={{
                      borderBottomRightRadius: 15,
                      paddingRight: 0,
                      paddingLeft: 0,
                      // marginHorizontal: -20, //You can style here
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
    // alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignSelf: 'center',
    borderRadius: 50,
    marginHorizontal: 30,
  },
  button: {
    // width: 200,
  },
  buttonOn: {
    borderRadius: 50,
    backgroundColor: '#575FDE',
    width: wp('20%'),
  },
  buttonOff: {
    width: wp('20%'),
  },
  container1: {
    flex: 1,
  },
  container2: {
    flex: 1,
    // width: wp('95%'),
    margin: 0,
    paddingBottom: 20,
    backgroundColor: '#4048CC',
    paddingTop: 20,
  },
});
export default ChartOne;
