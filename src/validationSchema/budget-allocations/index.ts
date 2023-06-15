import * as yup from 'yup';

export const budgetAllocationValidationSchema = yup.object().shape({
  campaign_name: yup.string().required(),
  allocated_budget: yup.number().integer().required(),
  advertiser_id: yup.string().nullable().required(),
  media_planner_id: yup.string().nullable().required(),
});
