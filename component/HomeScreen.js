import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View >
      <Text>You have (undefined) friends.</Text>

      <Button
        title="Add some friends"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};
export default HomeScreen;
