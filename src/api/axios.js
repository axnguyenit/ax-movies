import axios from 'axios';
import queryString from 'query-string';
import { TMDB_API_KEY, TMDB_URL } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: TMDB_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: TMDB_API_KEY }),
});

axiosInstance.interceptors.request.use(async (config) => config);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error;
  },
);

export default axiosInstance;
