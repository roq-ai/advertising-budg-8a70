import { AdvertiserInterface } from 'interfaces/advertiser';
import { GetQueryInterface } from 'interfaces';

export interface PastPerformanceInterface {
  id?: string;
  campaign_name: string;
  performance_data: string;
  advertiser_id: string;
  created_at?: any;
  updated_at?: any;

  advertiser?: AdvertiserInterface;
  _count?: {};
}

export interface PastPerformanceGetQueryInterface extends GetQueryInterface {
  id?: string;
  campaign_name?: string;
  performance_data?: string;
  advertiser_id?: string;
}
