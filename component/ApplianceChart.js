import React, {useState, useEffect} from 'react';
import {t} from 'react-native-tailwindcss';
import {Searchbar, Title, Button} from 'react-native-paper';
import Header from './Header';
import Footer from './Footer';
import {LineChart, BarChart} from 'react-native-chart-kit';
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

const ApplianceChart = props => {
  const [loading, setLoading] = useState(true);
  const token = props.token;
  const [startDateParam, setStartDateParam] = useState(
    props.route.params?.startDate ? props.route.params.startDate : null,
  );
  const [endDateParam, setEndDateParam] = useState(
    props.route.params?.endDate ? props.route.params.endDate : null,
  );
  const [deviceParams, setDeviceParams] = useState(
    props.deviceParams ? props.deviceParams : '',
  );
  // deviceParams;
  const [deviceArray, setDeviceArray] = useState(props.deviceArray); //if throws error then split deviceParams by '&'
  // setDeviceArray(props.deviceArray);
  // console.log(deviceArray);
  // setDeviceParams(props.deviceParams);
  const [buttonArray, setButtonArray] = useState([
    {
      dName: '1m',
      name: '1 Month',
      id: 0,
      selected: false,
      data: null,
      bardata: null,
      width: '100%',
      fillShadowGradient: '#79D2DE',
    },
    {
      dName: '7D',
      name: '7 days',
      id: 1,
      selected: false,
      data: null,
      bardata: null,
      width: '100%',
      fillShadowGradient: '#ffffff',
    },
    {
      dName: 'Y',
      name: 'Yesterday',
      id: 2,
      selected: false,
      data: null,
      bardata: null,
      width: '200%',
      fillShadowGradient: '#4048CC',
    },
    {
      dName: 'T',
      name: 'Today',
      id: 3,
      selected: true,
      data: null,
      bardata: null,
      width: '200%',
      fillShadowGradient: '#4048CC',
    },
    {
      dName: 'Custom',
      name: 'custom',
      id: 4,
      selected: false,
      data: null,
      bardata: null,
      width: '200%',
      fillShadowGradient: '#4048CC',
    },
  ]);
  const [currentGraph, setCurrentGraph] = useState(3);
  const [refreshing, setRefreshing] = useState(false);
  //   const [errorMessage, setErrorMessage] = useState(null);
  const colorArray = [
    (opacity = 1) => `rgba(236,102,102,1)`,

    (opacity = 1) => `rgba(20,122,214, 1)`,

    (opacity = 1) => `rgba(0,102,0, 1)`,
  ];

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
            const value = await instance(token).get(
              `/v1/devices/oneday/${type}?${deviceParams}`,
            );
            for (var i in value.data.resultConsumption.inputArray.datasets) {
              value.data.resultConsumption.inputArray.datasets[i].color =
                colorArray[i];
            }
            gData = {
              labels: value.data.resultConsumption.inputArray.labels,
              datasets: value.data.resultConsumption.inputArray.datasets,
              legend: value.data.resultConsumption.deviceName,
              overallConsumptionByDevice:
                value.data.resultConsumption.overallConsumptionByDevice,
              startDate: value.data.startDate,
              endDate: null,
            };
            bData = {
              labels: value.data.resultConsumption.deviceName,
              datasets: [
                {data: value.data.resultConsumption.overallConsumptionByDevice},
              ],
            };

            updateGraph(3, gData, bData);
            setLoading(false);
          }
          break;
        case '7days':
          if (!buttonArray[1].data) {
            setLoading(true);
            const value = await instance(token).get(
              `/v1/devices/${type}?${deviceParams}`,
            );
            for (var i in value.data.resultConsumption.inputArray.datasets) {
              value.data.resultConsumption.inputArray.datasets[i].color =
                colorArray[i];
            }
            gData = {
              labels: value.data.resultConsumption.inputArray.labels,
              datasets: value.data.resultConsumption.inputArray.datasets,
              legend: value.data.resultConsumption.deviceName,
              overallConsumptionByDevice:
                value.data.resultConsumption.overallConsumptionByDevice,
              startDate: value.data.startDate,
              endDate: value.data.endDate,
            };
            bData = {
              labels: value.data.resultConsumption.deviceName,
              datasets: [
                {data: value.data.resultConsumption.overallConsumptionByDevice},
              ],
            };
            updateGraph(1, gData, bData);
            setLoading(false);
          }
          break;
        case '1month':
          if (!buttonArray[0].data) {
            setLoading(true);
            const value = await instance(token).get(
              `/v1/devices/${type}?${deviceParams}`,
            );
            for (var i in value.data.resultConsumption.inputArray.datasets) {
              value.data.resultConsumption.inputArray.datasets[i].color =
                colorArray[i];
            }
            gData = {
              labels: value.data.resultConsumption.inputArray.labels,
              datasets: value.data.resultConsumption.inputArray.datasets,
              legend: value.data.resultConsumption.deviceName,
              overallConsumptionByDevice:
                value.data.resultConsumption.overallConsumptionByDevice,
              startDate: value.data.startDate,
              endDate: value.data.endDate,
            };
            bData = {
              labels: value.data.resultConsumption.deviceName,
              datasets: [
                {data: value.data.resultConsumption.overallConsumptionByDevice},
              ],
            };
            updateGraph(0, gData, bData);

            setLoading(false);
          }
        case 'yesterday':
          if (!buttonArray[2].data) {
            setLoading(true);
            const value = await instance(token).get(
              `/v1/devices/oneday/${type}?${deviceParams}`,
            );
            for (var i in value.data.resultConsumption.inputArray.datasets) {
              value.data.resultConsumption.inputArray.datasets[i].color =
                colorArray[i];
              // value.data.resultConsumption.inputArray.datasets[i].svg = {
              //   fill: ' rgba(236,102,102)',
              // };
            }

            gData = {
              labels: value.data.resultConsumption.inputArray.labels,
              datasets: value.data.resultConsumption.inputArray.datasets,
              legend: value.data.resultConsumption.deviceName,
              overallConsumptionByDevice:
                value.data.resultConsumption.overallConsumptionByDevice,
              startDate: value.data.startDate,
              endDate: null,
            };
            bData = {
              labels: value.data.resultConsumption.deviceName,
              datasets: [
                {data: value.data.resultConsumption.overallConsumptionByDevice},
              ],
            };
            updateGraph(2, gData, bData);

            setLoading(false);
          }
          break;
        default:
          if (!buttonArray[4].data) {
            setLoading(true);
            const value = await instance(token).get(
              `/v1/devices/customActivity?${deviceParams}&startDate=${startDateParam}&endDate=${endDateParam}`,
            );
            for (var i in value.data.resultConsumption.inputArray.datasets) {
              value.data.resultConsumption.inputArray.datasets[i].color =
                colorArray[i];
            }
            gData = {
              labels: value.data.resultConsumption.inputArray.labels,
              datasets: value.data.resultConsumption.inputArray.datasets,
              legend: value.data.resultConsumption.deviceName,
              overallConsumptionByDevice:
                value.data.resultConsumption.overallConsumptionByDevice,
              startDate: value.data.startDate,
              endDate: value.data.endDate,
            };
            bData = {
              labels: value.data.resultConsumption.deviceName,
              datasets: [
                {data: value.data.resultConsumption.overallConsumptionByDevice},
              ],
            };
            updateGraph(4, gData, bData);
            setLoading(false);
          }
      }
    } catch (err) {
      console.log('app chart + ' + err);
      setErrorMessage('No Data Found');
      setLoading(false);
    }
  };
  const color = () => {
    return (opacity = 1) => `rgba(255,0,0,${opacity})`;
  };
  useEffect(() => {
    // startDateParam != null ? buttonPress(4, '') : getGraphs('today');
    // getGraphs('today');
    // console.log('device ' + props.route.params.startDate);
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

  const updateGraph = (id, graphDataButton, barGraphData) => {
    setButtonArray(
      buttonArray.map(value => {
        {
          value.id == id &&
            (value.data = graphDataButton) &&
            (value.bardata = barGraphData);
        }
        return value;
      }),
    );
    setLoading(false);
  };
  return (
    <View style={{backgroundColor: '#4048CC'}}>
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingVertical: 30,
        }}
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
        {deviceArray &&
          (props.deviceSelect ? (
            <Text style={{alignSelf: 'center', fontSize: 18}}></Text>
          ) : (
            <Text style={{alignSelf: 'center', fontSize: 18}}>
              {deviceArray.length} Appliances Selected
            </Text>
          ))}
        <Title style={{alignSelf: 'center'}}>Appliance Consumption</Title>
        {!errorMessage && (
          <View>
            {!startDateParam ? (
              <View style={styles.buttonView}>
                {buttonArray &&
                  buttonArray.slice(0, -1).map((btn, index) => {
                    return (
                      <Button
                        key={index}
                        color={'black'}
                        style={
                          !btn.selected ? styles.buttonOff : styles.buttonOn
                        }
                        mode={!btn.selected ? 'text' : 'contained'}
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
                    !buttonArray[4].selected
                      ? styles.buttonOff
                      : styles.buttonOn
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
                      height={hp('40%')}
                      yAxisLabel=""
                      withInnerLines={false}
                      withOuterLines={false}
                      withVerticalLines={false}
                      withHorizontalLines={false}
                      withHorizontalLabels={true}
                      yAxisSuffix="/KW"
                      yAxisInterval={4} // optional, defaults to 1
                      onDataPointClick={({value, getColor}) =>
                        showMessage({
                          message: `${value}/Kw`,
                          backgroundColor: 'red',
                        })
                      }
                      chartConfig={{
                        // backgroundColor: '#4050B5',
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        fillShadowGradientOpacity: 1,
                        useShadowColorFromDataset: true,
                        fillShadowGradient: 'red',
                        strokeWidth: 1,
                        // backgroundGradientFromOpacity: 0,
                        // backgroundGradientToOpacity: 0,
                        decimalPlaces: 2, // optional, defaults to 2dp
                        // color: (opacity = 255) => `rgba(208,91,84, ${opacity})`,
                        labelColor: (opacity = 1) =>
                          `rgba(0, 0, 0, ${opacity})`,
                        style: {
                          borderRadius: 0,
                        },
                        propsForDots: {
                          r: '0.1',
                          strokeWidth: '1',
                          // stroke: '#ffa726',
                        },
                        propsForBackgroundLines: {
                          stroke: '#ffffff',
                        },
                      }}
                      bezier
                      style={{
                        marginVertical: 10,
                        marginLeft: 10,
                        // borderRadius: 20,
                      }}
                    />
                  );
              })}
          </ScrollView>
        )}
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.5,
            marginHorizontal: 30,
            marginBottom: 30,
          }}
        />
        {loading ? (
          <Loading />
        ) : (
          <View>
            {buttonArray
              .filter(value => value.selected == true)
              .map((element, index) =>
                element.data.overallConsumptionByDevice.map((element2, i) => {
                  return (
                    <View
                      key={i}
                      style={{
                        backgroundColor: '#ECF0F9',
                        // width: wp('100%'),
                        marginHorizontal: 30,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                        elevation: 4,
                        borderRadius: 20,
                        padding: 20,
                        marginBottom: 30,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Robot',
                          fontSize: 13,
                          color: '#616161',
                        }}>
                        {element.data.legend[i]}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Robot',
                          fontSize: 22,
                          fontWeight: 'bold',
                          color: '#616161',
                        }}>
                        {element2}KW
                      </Text>
                    </View>
                  );
                }),
              )}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4048CC',
                paddingTop: 30,
                paddingBottom: 30,
                marginTop: 10,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                borderWidth: 1,
                // margin: '100',
              }}>
              {buttonArray
                .filter(value => value.selected == true)
                .map(
                  (element, index) => {
                    if (element.bardata)
                      return (
                        <BarChart
                          data={element.bardata}
                          width={wp('80%')}
                          height={220}
                          yAxisLabel=""
                          withInnerLines={false}
                          withOuterLines={false}
                          withVerticalLines={false}
                          withHorizontalLines={false}
                          withHorizontalLabels={true}
                          backgroundColor="red"
                          yAxisSuffix="/KW"
                          chartConfig={{
                            backgroundGradientFrom: '#4048CC',
                            backgroundGradientTo: '#4048CC',
                            fillShadowGradientOpacity: 1,
                            fillShadowGradient: '#6493D1',
                            strokeWidth: 3,
                            // fillShadowGradient: 'red',
                            useShadowColorFromDataset: false,
                            color: (opacity = 1) =>
                              `rgba(255, 255, 255, ${opacity})`,
                            strokeWidth: 2, // optional, default 3
                            barPercentage: 2,
                            propsForBackgroundLines: {
                              stroke: '#ffffff',
                            },
                          }}
                          // verticalLabelRotation={30}
                        />
                      );
                  },
                  // console.log(element))}
                )}
            </View>
          </View>
        )}
      </View>
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
    width: 20,
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
    width: wp('95%'),
    margin: 10,
  },
});

export default ApplianceChart;
