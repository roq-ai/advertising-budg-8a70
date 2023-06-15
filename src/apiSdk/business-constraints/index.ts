import axios from 'axios';
import queryString from 'query-string';
import { BusinessConstraintInterface, BusinessConstraintGetQueryInterface } from 'interfaces/business-constraint';
import { GetQueryInterface } from '../../interfaces';

export const getBusinessConstraints = async (query?: BusinessConstraintGetQueryInterface) => {
  const response = await axios.get(`/api/business-constraints${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBusinessConstraint = async (businessConstraint: BusinessConstraintInterface) => {
  const response = await axios.post('/api/business-constraints', businessConstraint);
  return response.data;
};

export const updateBusinessConstraintById = async (id: string, businessConstraint: BusinessConstraintInterface) => {
  const response = await axios.put(`/api/business-constraints/${id}`, businessConstraint);
  return response.data;
};

export const getBusinessConstraintById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/business-constraints/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBusinessConstraintById = async (id: string) => {
  const response = await axios.delete(`/api/business-constraints/${id}`);
  return response.data;
};
