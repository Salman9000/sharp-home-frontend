import SInfo from 'react-native-sensitive-info';

const key = 'authToken';
const storeToken = async (authToken) => {
  try {
    await SInfo.setItem(key, authToken, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
    console.log('stored token')
  } catch (error) {
    console.log('Error storing the auth token');
  }
};

const getToken = async () => {
  try {
    const authToken = await SInfo.getItem(key, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
    return authToken;
  } catch (error) {
    console.log('Errpr getting the auth token');
  }
};

const removeToken = async () => {
  try {
    await SInfo.deleteItem(key, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
  } catch (error) {
    console.log('Error removing the auth token');
  }
};

export default{storeToken,getToken,removeToken}