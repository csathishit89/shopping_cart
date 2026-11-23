import axios from 'axios';
import { API_URL } from '../const';

export const createOrderService = (orderData) => {
  const data = {
    AddOrderDetailsToken: orderData,
  };
  const url = `${API_URL}AddOrder`;
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};

export const getOrderList = (orderData) => {
  const data = {
    GetOrderListToken: orderData,
  };
  const url = `${API_URL}GetOrderList`;
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};
