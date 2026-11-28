import axios from 'axios';
import { API_URL } from '../const';

export const fetchTotalOrdersService = (token) => {
  const data = {
    FetchTotalOrderToken: token,
  };
  const url = `${API_URL}FetchTotalOrderDetails`;
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};

export const fetchTotalRevenueProfitService = (token) => {
  const data = {
    FetchTotalRevenueProfitToken: token,
  };
  const url = `${API_URL}FetchTotalRevenueProfitDetails`;
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};

export const fetchMonthRevenueProfitService = (token) => {
  const data = {
    FetchTotalRevenueProfitForMonthToken: token,
  };
  const url = `${API_URL}FetchTotalRevenueProfitForMonth`;
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};

export const fetchTopTenProductSalesService = (token) => {
  const data = {
    FetchTopTenProdutSalesToken: token,
  };
  const url = `${API_URL}FetchTopTenProdutSales`;
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};