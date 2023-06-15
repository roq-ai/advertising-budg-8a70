import * as yup from 'yup';
import { budgetAllocationValidationSchema } from 'validationSchema/budget-allocations';
import { businessConstraintValidationSchema } from 'validationSchema/business-constraints';
import { pastPerformanceValidationSchema } from 'validationSchema/past-performances';

export const advertiserValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  budget_allocation: yup.array().of(budgetAllocationValidationSchema),
  business_constraint: yup.array().of(businessConstraintValidationSchema),
  past_performance: yup.array().of(pastPerformanceValidationSchema),
});
