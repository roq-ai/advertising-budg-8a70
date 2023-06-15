import { AdvertiserInterface } from 'interfaces/advertiser';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BudgetAllocationInterface {
  id?: string;
  campaign_name: string;
  allocated_budget: number;
  advertiser_id: string;
  media_planner_id: string;
  created_at?: any;
  updated_at?: any;

  advertiser?: AdvertiserInterface;
  user?: UserInterface;
  _count?: {};
}

export interface BudgetAllocationGetQueryInterface extends GetQueryInterface {
  id?: string;
  campaign_name?: string;
  advertiser_id?: string;
  media_planner_id?: string;
}
