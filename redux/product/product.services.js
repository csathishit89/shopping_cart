import axios from 'axios';
import { API_URL } from '../const';

export const getProductList = (productData) => {
  const data = {
    GetProductListToken: productData,
  };
  const url = `${API_URL}GetProductList`;
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};