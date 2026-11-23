import axios from 'axios';
import { API_URL } from '../const';

export const getProductList = (productData) => {
  const data = {
    GetProductListToken: productData,
  };
  const url = `${API_URL}GetProductList`;
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};

export const sendProductNewInfo = (productData) => {
  const data = {
    SaveProductNewInfoToken: productData,
  };
  const url = `${API_URL}SendProductNewInfo`;
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};

export const addProduct = (productData) => {
  const data = {
    AddProductDataToken: productData,
  };
  const url = `${API_URL}AddProduct`;
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};
