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
import { getPastPerformanceById, updatePastPerformanceById } from 'apiSdk/past-performances';
import { Error } from 'components/error';
import { pastPerformanceValidationSchema } from 'validationSchema/past-performances';
import { PastPerformanceInterface } from 'interfaces/past-performance';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AdvertiserInterface } from 'interfaces/advertiser';
import { getAdvertisers } from 'apiSdk/advertisers';

function PastPerformanceEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PastPerformanceInterface>(
    () => (id ? `/past-performances/${id}` : null),
    () => getPastPerformanceById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PastPerformanceInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePastPerformanceById(id, values);
      mutate(updated);
      resetForm();
      router.push('/past-performances');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PastPerformanceInterface>({
    initialValues: data,
    validationSchema: pastPerformanceValidationSchema,
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
            Edit Past Performance
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
            <FormControl id="performance_data" mb="4" isInvalid={!!formik.errors?.performance_data}>
              <FormLabel>Performance Data</FormLabel>
              <Input
                type="text"
                name="performance_data"
                value={formik.values?.performance_data}
                onChange={formik.handleChange}
              />
              {formik.errors.performance_data && <FormErrorMessage>{formik.errors?.performance_data}</FormErrorMessage>}
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
  entity: 'past_performance',
  operation: AccessOperationEnum.UPDATE,
})(PastPerformanceEditPage);
