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

const Header = () => {
  const _goBack = () => console.log('Went back');
  const _handleMore = () => console.log('Shown more');
  return (
    <Appbar.Header style={[t.bgBlue900]}>
      <Appbar.BackAction onPress={_goBack} size={20} />
      <Appbar.Content title="Your rooms" titleStyle={{textAlign: 'center'}} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} size={24} />
    </Appbar.Header>
  );
};

export default Header;
