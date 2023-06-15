import axios from 'axios';
import queryString from 'query-string';
import { PastPerformanceInterface, PastPerformanceGetQueryInterface } from 'interfaces/past-performance';
import { GetQueryInterface } from '../../interfaces';

export const getPastPerformances = async (query?: PastPerformanceGetQueryInterface) => {
  const response = await axios.get(`/api/past-performances${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPastPerformance = async (pastPerformance: PastPerformanceInterface) => {
  const response = await axios.post('/api/past-performances', pastPerformance);
  return response.data;
};

export const updatePastPerformanceById = async (id: string, pastPerformance: PastPerformanceInterface) => {
  const response = await axios.put(`/api/past-performances/${id}`, pastPerformance);
  return response.data;
};

export const getPastPerformanceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/past-performances/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePastPerformanceById = async (id: string) => {
  const response = await axios.delete(`/api/past-performances/${id}`);
  return response.data;
};
