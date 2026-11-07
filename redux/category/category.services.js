import axios from 'axios';
import { API_URL } from '../const';

export const getCategoryList = (categoryData) => {
  const data = {
    GetCategoryListToken: categoryData,
  };
  const url = `${API_URL}GetCategoryList`;
  return axios.post(url, data, { headers: { 'Content-type': 'application/json' } });
};
