import * as yup from 'yup';

export const businessConstraintValidationSchema = yup.object().shape({
  constraint_name: yup.string().required(),
  constraint_value: yup.string().required(),
  advertiser_id: yup.string().nullable().required(),
});
