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
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ListItem = ({item, deleteItem}) => {
  return (
    <TouchableOpacity
      style={[
        t.p4,
        t.roundedBFull,
        t.flex1,
        t.itemsStart,
        t.alignCenter,
        t.wFull,
      ]}
      onPress={() => deleteItem(item.id)}>
      <View style={[t.itemsCenter]}>
        <View
          style={[t.bgWhite, t.textshadowOutline, t.roundedFull, t.p8, t.mB2]}>
          <Icon name={item.iconName} size={25} color="red" />
        </View>
        <Text style={[t.textbase]}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
export default ListItem;
