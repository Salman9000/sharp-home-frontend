/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {t} from 'react-native-tailwindcss';

// import Header from './component/Header';
// import {v4 as uuidv4} from 'uuid';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Alert,
} from 'react-native';

import Header from './component/Header';
import ListItem from './component/ListItem';
import AddItem from './component/AddItem';

const App = () => {
  const [items, setItems] = useState([
    {id: 1, text: 'Living room', iconName: 'coffee'},
    {id: 2, text: 'Kitchen', iconName: 'coffee'},
    {id: 3, text: 'Bathroomroom', iconName: 'coffee'},
    {id: 4, text: 'Washroom', iconName: 'coffee'},
  ]);

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id != id);
    });
  };

  const addItem = text => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item', [{text: 'Ok'}]);
    } else {
      setItems(prevItems => {
        return [{id: prevItems.id++, text, iconName: 'coffee'}, ...prevItems];
      });
    }
  };
  return (
    <View style={[t.flex1, t.bgGray200]}>
      <Header />
      <AddItem addItem={addItem} />
      <FlatList
        numColumns={3}
        data={items}
        renderItem={({item}) => (
          <ListItem deleteItem={deleteItem} item={item} />
        )}
      />
    </View>
  );
};

export default App;
