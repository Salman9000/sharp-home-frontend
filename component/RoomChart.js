import React, {useState, useEffect} from 'react';
import {t} from 'react-native-tailwindcss';
import {Searchbar, Title, Button} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import Icon2 from 'react-native-vector-icons/FontAwesome';
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
import Loading from './Loading';
const RoomChart = props => {
  const [startDateParam, setStartDateParam] = useState(
    props.route.params.startDate || null,
  );
  const [endDateParam, setEndDateParam] = useState(
    props.route.params.endDate || null,
  );
  const token = props.token;
  const [loading, setLoading] = useState(true);
  const [deviceParams, setDeviceParams] = useState(props.deviceParams);
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
    {
      dName: 'Custom',
      name: 'custom',
      id: 4,
      selected: false,
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
      // console.log('start ' + startDateParam);
      switch (type) {
        case 'today':
          if (!buttonArray[3].data) {
            setLoading(true);

            const value = await instance(token).get(
              `/v1/activity/${type}?${deviceParams}`,
            );

            (value.data.resultOneDay.inputArray.datasets.color = (
              opacity = 1,
            ) => 'rgba(20,122,214,1)'),
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

            const value = await instance(token).get(
              `/v1/activity/${type}?${deviceParams}`,
            );

            (value.data.result7Days.inputArray.datasets.color = (opacity = 1) =>
              'rgba(20,122,214,1)'),
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

            const value = await instance(token).get(
              `/v1/activity/${type}?${deviceParams}`,
            );

            (value.data.result1Month.inputArray.datasets.color = (
              opacity = 1,
            ) => 'rgba(20,122,214,1)'),
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

            const value = await instance(token).get(
              `/v1/activity/${type}?${deviceParams}`,
            );

            (value.data.resultOneDay.inputArray.datasets.color = (
              opacity = 1,
            ) => 'rgba(20,122,214,1)'),
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
        default:
          if (!buttonArray[4].data) {
            setLoading(true);
            const value = await instance(token).get(
              `/v1/activity/customActivity?${deviceParams}&startDate=${startDateParam}&endDate=${endDateParam}`,
            );
            console.log('room' + value.data);
            (value.data.resultConsumption.inputArray.datasets.color = (
              opacity = 1,
            ) => 'rgba(20,122,214,1)'),
              (gData = {
                labels: value.data.resultConsumption.inputArray.labels,
                datasets: [value.data.resultConsumption.inputArray.datasets],
                consumption: value.data.resultConsumption.overallConsumption,
                startDate: value.data.startDate,
                endDate: value.data.endDate,
              });
            updateGraph(4, gData);
            setLoading(false);
          }
      }
    } catch (error) {
      // console.log(error, 'aaaaaaaaaaaaaaaaaaaaaaaaaa');
      setErrorMessage('No Data Found');
      setLoading(false);
    }
  };
  useEffect(() => {
    // console.log('hello' + props.route.params.startDate);
    startDateParam != null ? buttonPress(4, '') : getGraphs('today');
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
      {startDateParam && (
        <Title
          style={{
            alignSelf: 'center',
            color: '#aaa',
            marginBottom: 20,
          }}
          onPress={() => {
            setStartDateParam(null);
            setErrorMessage(null);
            buttonPress(3, 'today');
          }}>
          x Clear Filter
        </Title>
      )}
      <View
        style={{flex: 1, justifyContent: 'space-between', direction: 'row'}}>
        <Title
          style={{
            alignSelf: 'center',
            color: 'black',
            marginBottom: 20,
          }}>
          Overall Room Consumption
        </Title>
      </View>
      {!errorMessage && (
        <View>
          {!startDateParam ? (
            <View style={styles.buttonView}>
              {buttonArray &&
                buttonArray.slice(0, -1).map((btn, index) => {
                  return (
                    <Button
                      color={'black'}
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
          ) : (
            <View style={styles.buttonView}>
              <Button
                color={'black'}
                style={
                  !buttonArray[4].selected ? styles.buttonOff : styles.buttonOn
                }
                mode={!buttonArray[4].selected ? 'text' : 'contained'}
                dark={true}
                onPress={() => {
                  buttonPress(
                    buttonArray[4].id,
                    buttonArray[4].name.split(' ').join('').toLowerCase(),
                  );
                }}>
                {buttonArray[4].dName}
              </Button>
            </View>
          )}
          {loading ? (
            <Text></Text>
          ) : (
            buttonArray
              .filter(value => value.selected == true)
              .map((element, index) => {
                if (!element.data.endDate) {
                  return (
                    <Text
                      key={index}
                      style={{
                        color: 'black',
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
                        color: 'black',
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
                        color: 'black',
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
        </View>
      )}
      {loading ? (
        <Loading />
      ) : errorMessage ? (
        <Title
          style={{
            alignSelf: 'center',
            color: 'black',
          }}>
          No Data Found
        </Title>
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
                    withHorizontalLabels={true}
                    yAxisLabel=""
                    yAxisSuffix="/KW"
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
                      backgroundGradientFrom: 'white',
                      backgroundGradientTo: 'white',
                      fillShadowGradientOpacity: 1,
                      fillShadowGradient: '#6493D1',
                      useShadowColorFromDataset: true,
                      strokeWidth: 2,
                      // backgroundGradientFromOpacity: 0,
                      // backgroundGradientToOpacity: 0,
                      decimalPlaces: 2, // optional, defaults to 2dp
                      // color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
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
                      //   paddingRight: 0,
                      //   paddingLeft: 0,
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
    backgroundColor: 'white',
    paddingTop: 20,
  },
});
export default RoomChart;
