import axios from 'axios';
import queryString from 'query-string';
import { BudgetAllocationInterface, BudgetAllocationGetQueryInterface } from 'interfaces/budget-allocation';
import { GetQueryInterface } from '../../interfaces';

export const getBudgetAllocations = async (query?: BudgetAllocationGetQueryInterface) => {
  const response = await axios.get(`/api/budget-allocations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBudgetAllocation = async (budgetAllocation: BudgetAllocationInterface) => {
  const response = await axios.post('/api/budget-allocations', budgetAllocation);
  return response.data;
};

export const updateBudgetAllocationById = async (id: string, budgetAllocation: BudgetAllocationInterface) => {
  const response = await axios.put(`/api/budget-allocations/${id}`, budgetAllocation);
  return response.data;
};

export const getBudgetAllocationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/budget-allocations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBudgetAllocationById = async (id: string) => {
  const response = await axios.delete(`/api/budget-allocations/${id}`);
  return response.data;
};
