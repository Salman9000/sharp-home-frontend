const axios = require('axios');
import {BASE_URL} from '@env';

const instance = token =>
  axios.create({
    baseURL: `${BASE_URL}`,
    headers: {Authorization: 'Bearer ' + token},
  });

export default instance;

// const response = await instance(token).get('/v1/rooms');
