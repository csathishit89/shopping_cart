import axios from 'axios';
import { API_URL } from '../const';

export const userLoginVerify = (loginData) => {
  const data = {
    LoginAppToken: loginData,
  };
  const url = `${API_URL}AppUserLogin`;
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};

export const getAppVersionDetails = () => {
  const url = `${API_URL}GetAppVersion`;
  return axios.get(url, { headers: { 'Content-type': 'application/json' } });
};

export const fetchGeneralDataAPI = () => {
  const url = `${API_URL}FetchGeneralDataApp`;
  return axios.get(url, { headers: { 'Content-type': 'application/json' } });
};

export const getUserDetails = (loginData) => {
  const data = {
    userDetailsToken: loginData,
  };
  const url = `${API_URL}GetUserDetails`;
  console.log('GetUserDetails',data,url);
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};
