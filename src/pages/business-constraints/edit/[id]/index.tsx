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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getBusinessConstraintById, updateBusinessConstraintById } from 'apiSdk/business-constraints';
import { Error } from 'components/error';
import { businessConstraintValidationSchema } from 'validationSchema/business-constraints';
import { BusinessConstraintInterface } from 'interfaces/business-constraint';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AdvertiserInterface } from 'interfaces/advertiser';
import { getAdvertisers } from 'apiSdk/advertisers';

function BusinessConstraintEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<BusinessConstraintInterface>(
    () => (id ? `/business-constraints/${id}` : null),
    () => getBusinessConstraintById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BusinessConstraintInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBusinessConstraintById(id, values);
      mutate(updated);
      resetForm();
      router.push('/business-constraints');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<BusinessConstraintInterface>({
    initialValues: data,
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
            Edit Business Constraint
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'business_constraint',
  operation: AccessOperationEnum.UPDATE,
})(BusinessConstraintEditPage);
