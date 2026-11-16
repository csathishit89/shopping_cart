import axios from 'axios';
import { API_URL } from '../const';

export const createOrderService = (orderData) => {
  const data = {
    AddOrderDetailsToken: orderData,
  };
  const url = `${API_URL}AddOrder`;
  console.log(data);
  console.log(url);
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};