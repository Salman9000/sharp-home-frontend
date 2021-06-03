import React from 'react';
import {useState, setState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Switch,
  Pressable,
  RefreshControl,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const axios = require('axios');
import {
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Right,
  Button,
  Icon,
} from 'native-base';
import {BASE_URL} from '@env';
import instance from '../helper';
import Loading from './Loading';
import Swipeout from 'react-native-swipeout';

const Notifications = props => {
  const token = props.token;
  const [notif, setNotif] = useState([]);
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getNotifications();
    setRefreshing(false);
  }, []);

  const getNotifications = async () => {
    try {
      const response = await instance(token).get(`/v1/notification`);
      setNotif(response.data.docs);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNotification = async notification => {
    try {
      const response = await instance(token).delete(
        `/v1/notification/${notification.id}`,
      );
      if (response) {
        setNotif(notif.filter(value => value.id !== notification.id));
      }
    } catch (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
    }
  };

  useEffect(() => {
    // getConsumptions();
    getNotifications();
  }, []);

  return (
    <View style={styles.container1}>
      <Header
        title="Notifications"
        nav={props.navigation}
        buttonsEnabled={true}
      />
      <>
        {loading ? (
          <Loading />
        ) : notif.length < 1 ? (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Text style={styles.text}>No notifications</Text>
          </ScrollView>
        ) : (
          <>
            <ScrollView
              style={styles.container2}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {notif.map(item => (
                <View key={item.id}>
                  <Card style={styles.card} transparent={true}>
                    <View
                      style={{
                        borderRadius: 20,
                      }}>
                      <CardItem
                        header
                        style={{
                          backgroundColor: 'transparent',
                          marginLeft: 0,
                          marginTop: 0,
                          marginRight: 0,
                          marginBottom: 0,
                        }}>
                        <Left>
                          <Text style={styles.notificationType}>
                            {item.type}
                          </Text>
                        </Left>
                      </CardItem>
                      <CardItem
                        style={{
                          backgroundColor: 'transparent',
                          marginLeft: 10,
                          marginTop: -20,
                          marginRight: 0,
                          marginBottom: 0,
                        }}>
                        <Text style={styles.notificationMsg}>
                          {item.message}
                        </Text>
                      </CardItem>
                      <CardItem
                        style={{
                          backgroundColor: 'transparent',
                          marginLeft: 10,
                          marginTop: -10,
                          marginRight: 0,
                          marginBottom: 0,
                        }}>
                        <TouchableOpacity
                          onPress={() => deleteNotification(item)}
                          style={{
                            backgroundColor: '#b70616',
                            paddingHorizontal: 40,
                            paddingVertical: 5,
                            borderRadius: 10,
                          }}>
                          <Text style={{color: 'white'}}>Dimiss</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#f90c21',
                            marginLeft: 30,
                            paddingHorizontal: 40,
                            paddingVertical: 5,
                            borderRadius: 10,
                          }}>
                          <Text style={{color: 'white'}}>Learn More</Text>
                        </TouchableOpacity>
                      </CardItem>
                    </View>
                  </Card>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </>
      <Footer nav={props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#F4F5F8',
  },
  scrollv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    backgroundColor: 'transparent',
    flex: 1,
    margin: 10,
  },
  card: {
    backgroundColor: '#f8d7da',
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#f5c6cb',
    borderRadius: 20,
    height: 170,
  },
  cardItem: {
    backgroundColor: 'transparent',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 0,
  },
  TextInput: {
    height: 50,
    width: wp('90%'),
    flex: 1,
    fontSize: 20,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  notificationType: {
    fontFamily: 'Roboto',
    color: '#721c24',
    fontWeight: 'bold',
    fontSize: 22,
  },
  notificationMsg: {
    fontFamily: 'Roboto',
    color: '#721c24',
    fontWeight: '300',
    fontSize: 14,
  },
  desc: {
    fontSize: 14,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
  },
  text: {
    fontSize: 36,
  },
  iconContainer: {
    width: 80,
    height: 80,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    borderRadius: 80,
    backgroundColor: '#1e90ff',
    padding: 7,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  button: {
    justifyContent: 'center',
    marginTop: 30,
    alignSelf: 'center',
    width: wp('88%'),
    backgroundColor: '#42A4FE',
  },
});
export default Notifications;
