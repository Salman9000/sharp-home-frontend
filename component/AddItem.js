import React, {useState} from 'react';
import {t} from 'react-native-tailwindcss';
import {Searchbar} from 'react-native-paper';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

const AddItem = ({addItem}) => {
  const [text, setText] = useState('');
  const onChange = textValue => {
    setText(textValue);
  };
  return (
    <View>
      <View style={[t.m4]}>
        <Searchbar
          inputStyle={{backgroundColor: 'white'}}
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 5,
          }}
          placeholderTextColor={'#g5g5g5'}
          placeholder={'Search in rooms'}
          onChangeText={onChange}
        />
      </View>
      {/* <TouchableOpacity
        style={[t.p3, t.m1, t.bgBlue400, t.roundedFull, t.mB2]}
        onPress={() => addItem(text)}>
        <Text style={[t.textWhite, t.textCenter, t.text2xl]}>
          <Icon name="plus" size={20} />
          Add Item
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({});
export default AddItem;
