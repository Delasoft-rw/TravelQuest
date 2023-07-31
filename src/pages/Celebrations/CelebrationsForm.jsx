import { useEffect, useState } from 'react';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
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
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Iconify from 'components/Iconify';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


const CelebrationsForm = ({ toggleModal, action }) => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
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
              clientName: '',
              dateOfBirth: '',
              message: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              clientName: Yup.string().required('Client Name is required'),
              dateOfBirth: Yup.string().required('Date of Birth is required'),
              message: Yup.string().required('Message is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
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
            }}
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
                          // An Array of random names
                          ['John', 'Jane', 'Jack', 'Jill'].map((name, index) => (
                            <MenuItem key={index} value={name}>{name}</MenuItem>
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

                  <Grid item xs={12}>
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
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="message-signup">Message*</InputLabel>
                      <OutlinedInput
                        id="message-login"
                        type="message"
                        value={values.message}
                        name="message"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="John"
                        fullWidth
                        error={Boolean(touched.message && errors.message)}
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
