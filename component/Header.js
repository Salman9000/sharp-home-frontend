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

const Header = props => {
  const _goBack = () => {
    console.log('Went back');
    props.nav.pop();
  };
  const _handleMore = () => console.log('Shown more');
  return (
    <Appbar.Header style={{backgroundColor: '#303849'}}>
      {props.buttonsEnabled ? (
        <Appbar.BackAction onPress={_goBack} size={20} />
      ) : (
        <></>
      )}
      <Appbar.Content title={props.title} titleStyle={{textAlign: 'center'}} />
      {props.buttonsEnabled ? (
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} size={24} />
      ) : (
        <></>
      )}
    </Appbar.Header>
  );
};

export default Header;
