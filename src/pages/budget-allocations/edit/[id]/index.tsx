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
import { getBudgetAllocationById, updateBudgetAllocationById } from 'apiSdk/budget-allocations';
import { Error } from 'components/error';
import { budgetAllocationValidationSchema } from 'validationSchema/budget-allocations';
import { BudgetAllocationInterface } from 'interfaces/budget-allocation';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AdvertiserInterface } from 'interfaces/advertiser';
import { UserInterface } from 'interfaces/user';
import { getAdvertisers } from 'apiSdk/advertisers';
import { getUsers } from 'apiSdk/users';

function BudgetAllocationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<BudgetAllocationInterface>(
    () => (id ? `/budget-allocations/${id}` : null),
    () => getBudgetAllocationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BudgetAllocationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBudgetAllocationById(id, values);
      mutate(updated);
      resetForm();
      router.push('/budget-allocations');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<BudgetAllocationInterface>({
    initialValues: data,
    validationSchema: budgetAllocationValidationSchema,
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
            Edit Budget Allocation
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
            <FormControl id="campaign_name" mb="4" isInvalid={!!formik.errors?.campaign_name}>
              <FormLabel>Campaign Name</FormLabel>
              <Input
                type="text"
                name="campaign_name"
                value={formik.values?.campaign_name}
                onChange={formik.handleChange}
              />
              {formik.errors.campaign_name && <FormErrorMessage>{formik.errors?.campaign_name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="allocated_budget" mb="4" isInvalid={!!formik.errors?.allocated_budget}>
              <FormLabel>Allocated Budget</FormLabel>
              <NumberInput
                name="allocated_budget"
                value={formik.values?.allocated_budget}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('allocated_budget', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.allocated_budget && <FormErrorMessage>{formik.errors?.allocated_budget}</FormErrorMessage>}
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
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'media_planner_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
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
  entity: 'budget_allocation',
  operation: AccessOperationEnum.UPDATE,
})(BudgetAllocationEditPage);
