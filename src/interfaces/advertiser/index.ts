import { BudgetAllocationInterface } from 'interfaces/budget-allocation';
import { BusinessConstraintInterface } from 'interfaces/business-constraint';
import { PastPerformanceInterface } from 'interfaces/past-performance';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AdvertiserInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  budget_allocation?: BudgetAllocationInterface[];
  business_constraint?: BusinessConstraintInterface[];
  past_performance?: PastPerformanceInterface[];
  user?: UserInterface;
  _count?: {
    budget_allocation?: number;
    business_constraint?: number;
    past_performance?: number;
  };
}

export interface AdvertiserGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
