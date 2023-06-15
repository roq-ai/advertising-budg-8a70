import { AdvertiserInterface } from 'interfaces/advertiser';
import { GetQueryInterface } from 'interfaces';

export interface BusinessConstraintInterface {
  id?: string;
  constraint_name: string;
  constraint_value: string;
  advertiser_id: string;
  created_at?: any;
  updated_at?: any;

  advertiser?: AdvertiserInterface;
  _count?: {};
}

export interface BusinessConstraintGetQueryInterface extends GetQueryInterface {
  id?: string;
  constraint_name?: string;
  constraint_value?: string;
  advertiser_id?: string;
}
