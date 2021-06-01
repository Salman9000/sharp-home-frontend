import React from 'react';
// import {Button, TextInput} from 'react-native-paper';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Loading = props => (
  <View style={!props.style && styles.loading}>
    <ActivityIndicator
      size={!props.size && 'large'}
      color={!props.color && 'blue'}
    />
  </View>
);

export default Loading;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
