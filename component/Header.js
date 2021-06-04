import React, {useState} from 'react';
import {t} from 'react-native-tailwindcss';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements';

const Header = props => {
  const _goBack = () => {
    console.log('Went back');
    props.nav.pop();
  };
  const _handleMore = () => props.nav.navigate('notifications');
  return (
    <Appbar.Header
      style={{backgroundColor: '#303849', justifyContent: 'center'}}>
      {props.buttonsEnabled ? (
        <Appbar.BackAction onPress={_goBack} size={20} />
      ) : (
        <></>
      )}
      <Appbar.Content title={props.title} titleStyle={{textAlign: 'center'}} />
      {props.buttonsEnabled ? (
        <>
          <View>
            <Appbar.Action
              // icon="bell"
              color="white"
              // style={{color: 'white'}}
              // onPress={_handleMore}
              size={24}
            />
          </View>
        </>
      ) : (
        <View>
          <Appbar.Action
            icon="bell"
            color="white"
            // style={{color: 'white'}}
            onPress={_handleMore}
            size={24}
          />
          <Badge
            status="primary"
            value={props.count}
            containerStyle={{position: 'absolute', top: 10, right: 25}}
          />
        </View>
      )}
    </Appbar.Header>
  );
};

export default Header;
