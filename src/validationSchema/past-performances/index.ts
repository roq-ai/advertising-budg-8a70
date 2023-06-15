import * as yup from 'yup';

export const pastPerformanceValidationSchema = yup.object().shape({
  campaign_name: yup.string().required(),
  performance_data: yup.string().required(),
  advertiser_id: yup.string().nullable().required(),
});
