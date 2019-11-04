import axios from 'axios';
import querystring from 'querystring';
// import { history } from 'react-router';

import { API_ROOT } from '@/config';
import { checkLogin } from '@/utils';

const ax = axios.create({
  baseURL: API_ROOT,
});

// 拦截器
ax.interceptors.request.use(
  (conf) => {
    const config = { ...conf };
    if (
      config.method === 'post'
      || config.method === 'put'
      || config.method === 'delete'
      || config.method === 'patch'
    ) {
      config.data = querystring.stringify(config.data);
    }
    if (window.localStorage.getItem('TOKEN')) {
      config.headers.Authorization = `Bearer ${JSON.parse(window.localStorage.getItem('TOKEN') || '').token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

ax.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!checkLogin()) {
      // history.push('/login');
    }
    return Promise.reject(error);
  }
);

export default ax;
