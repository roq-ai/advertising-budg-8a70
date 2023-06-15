import axios from 'axios';
import queryString from 'query-string';
import { AdvertiserInterface, AdvertiserGetQueryInterface } from 'interfaces/advertiser';
import { GetQueryInterface } from '../../interfaces';

export const getAdvertisers = async (query?: AdvertiserGetQueryInterface) => {
  const response = await axios.get(`/api/advertisers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAdvertiser = async (advertiser: AdvertiserInterface) => {
  const response = await axios.post('/api/advertisers', advertiser);
  return response.data;
};

export const updateAdvertiserById = async (id: string, advertiser: AdvertiserInterface) => {
  const response = await axios.put(`/api/advertisers/${id}`, advertiser);
  return response.data;
};

export const getAdvertiserById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/advertisers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAdvertiserById = async (id: string) => {
  const response = await axios.delete(`/api/advertisers/${id}`);
  return response.data;
};
