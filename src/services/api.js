import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getData = () => {
  console.log(`${API_URL}/data`);
  return axios.get(`${API_URL}/data`);
};

export const getPrediction1 = (startDate, endDate) => {
  return axios.post(`${API_URL}/predictions/first`, {
    start_date: startDate,
    end_date: endDate,
  });
};

export const getPrediction2 = (startDate, endDate) => {
  return axios.post(`${API_URL}/predictions/second`, {
    start_date: startDate,
    end_date: endDate,
  });
};
