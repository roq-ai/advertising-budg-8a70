import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createBusinessConstraint } from 'apiSdk/business-constraints';
import { Error } from 'components/error';
import { businessConstraintValidationSchema } from 'validationSchema/business-constraints';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AdvertiserInterface } from 'interfaces/advertiser';
import { getAdvertisers } from 'apiSdk/advertisers';
import { BusinessConstraintInterface } from 'interfaces/business-constraint';

function BusinessConstraintCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BusinessConstraintInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBusinessConstraint(values);
      resetForm();
      router.push('/business-constraints');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BusinessConstraintInterface>({
    initialValues: {
      constraint_name: '',
      constraint_value: '',
      advertiser_id: (router.query.advertiser_id as string) ?? null,
    },
    validationSchema: businessConstraintValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Business Constraint
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="constraint_name" mb="4" isInvalid={!!formik.errors?.constraint_name}>
            <FormLabel>Constraint Name</FormLabel>
            <Input
              type="text"
              name="constraint_name"
              value={formik.values?.constraint_name}
              onChange={formik.handleChange}
            />
            {formik.errors.constraint_name && <FormErrorMessage>{formik.errors?.constraint_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="constraint_value" mb="4" isInvalid={!!formik.errors?.constraint_value}>
            <FormLabel>Constraint Value</FormLabel>
            <Input
              type="text"
              name="constraint_value"
              value={formik.values?.constraint_value}
              onChange={formik.handleChange}
            />
            {formik.errors.constraint_value && <FormErrorMessage>{formik.errors?.constraint_value}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<AdvertiserInterface>
            formik={formik}
            name={'advertiser_id'}
            label={'Select Advertiser'}
            placeholder={'Select Advertiser'}
            fetcher={getAdvertisers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'business_constraint',
  operation: AccessOperationEnum.CREATE,
})(BusinessConstraintCreatePage);
