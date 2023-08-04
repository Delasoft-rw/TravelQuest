import { useEffect, useState } from 'react';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  TextareaAutosize,
  Stack,
  Typography
} from '@mui/material';

import {
  MenuItem,
  Select
} from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import Iconify from 'components/Iconify';

import { axios } from 'utils/axios.interceptor';
import { closeSnackbar, enqueueSnackbar } from 'utils/index';


const CelebrationsForm = ({ toggleModal, action, refresh = () => { }, initialData = {} }) => {
  const [clients, setClients] = useState([])

  const getClients = async () => {
    try {
      const { data } = await axios.get('/auth/all-users');
      setClients(data.filter(el => el.userType === 'client'));
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const key = enqueueSnackbar('Loading form data...', {
        persist: true,
      })
      await getClients();

      closeSnackbar(key)

    } catch (e) {
      console.log(e)
    }
  }

  const onHandleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setStatus({ success: false });
      setSubmitting(false);
      toggleModal();
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
            <Typography variant="h3">{action} Celebration</Typography>
            <Typography onClick={toggleModal} variant="h3"><Iconify color="red" icon={'eva:close-circle-fill'} /></Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              clientName: initialData.clientName ?? '',
              // dateOfBirth: initialData.dateOfBirth ?? '',
              message: initialData.message ?? '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              clientName: Yup.string().required('Client Name is required'),
              // dateOfBirth: Yup.string().required('Date of Birth is required'),
              message: Yup.string().required('Message is required')
            })}
            onSubmit={onHandleSubmit}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="clientName-signup">Client Name*</InputLabel>
                      <Select
                        id="clientName"
                        name="clientName"
                        value={values.clientName}
                        onChange={handleChange}
                      >
                        {
                          clients.map((client, index) => (
                            <MenuItem key={index} value={client.id}>{client.lastName} {client.firstName}</MenuItem>
                          ))
                        }
                      </Select>
                      {touched.clientName && errors.clientName && (
                        <FormHelperText error id="helper-text-clientName-signup">
                          {errors.clientName}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  {/* <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="dateOfBirth-signup">Date*</InputLabel>
                      <DatePicker
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={values.dateOfBirth}
                        onBlur={handleBlur}
                        onChange={(...args) => {
                          handleChange({
                            target: {
                              name: 'dateOfBirth',
                              value: dayjs(args[0]).format('YYYY-MM-DD HH:mm:ss')
                            }
                          })
                        }}
                        error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                      />
                      {touched.dateOfBirth && errors.dateOfBirth && (
                        <FormHelperText error id="helper-text-dateOfBirth-signup">
                          {errors.dateOfBirth}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid> */}

                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="message-signup">Message*</InputLabel>
                      <TextareaAutosize
                        // fullWidth
                        minRows={3}
                        error={errors.message}
                        id="message-signup"
                        type="message"
                        value={values.message}
                        name="message"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Short message of Product"
                        style={{
                          border: !Boolean(touched.message && errors.message) ? '1px solid #c4c4c4' : '1px solid #f14343',
                          borderRadius: '5px',
                          padding: '15px',
                          outline: 'none',
                          fontFamily: 'unset'
                        }}
                      />
                      {touched.message && errors.message && (
                        <FormHelperText error id="helper-text-message-signup">
                          {errors.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        startIcon={<Iconify icon={action === "add" ? 'eva:plus-fill' : 'eva:edit-fill'} />}
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="bg-primary"
                        onClick={handleSubmit}
                      >
                        {action} Celebration
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid >
    </>
  );
};

export default CelebrationsForm;
