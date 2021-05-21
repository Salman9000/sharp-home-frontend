const axios = require('axios');
import {BASE_URL} from '@env';

const instance = token =>
  axios.create({
    baseURL: 'http://10.0.2.2:3000',
    headers: {Authorization: 'Bearer ' + token},
  });

export default instance;

// const response = await instance(token).get('/v1/rooms');
