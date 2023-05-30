import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from '../../components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Iconify from '../../components/Iconify';


const AlertsForm = ({ toggleModal, action }) => {
  const [level, setLevel] = useState();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
            <Typography variant="h3">{action} Alert</Typography>
            <Typography onClick={toggleModal} variant="h3"><Iconify color="red" icon={'eva:close-circle-fill'} /></Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              firstname: '',
              lastname: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              firstname: Yup.string().max(255).required('First Name is required'),
              lastname: Yup.string().max(255).required('Last Name is required'),
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
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                      <OutlinedInput
                        id="firstname-login"
                        type="firstname"
                        value={values.firstname}
                        name="firstname"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="John"
                        fullWidth
                        error={Boolean(touched.firstname && errors.firstname)}
                      />
                      {touched.firstname && errors.firstname && (
                        <FormHelperText error id="helper-text-firstname-signup">
                          {errors.firstname}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.lastname && errors.lastname)}
                        id="lastname-signup"
                        type="lastname"
                        value={values.lastname}
                        name="lastname"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Doe"
                        inputProps={{}}
                      />
                      {touched.lastname && errors.lastname && (
                        <FormHelperText error id="helper-text-lastname-signup">
                          {errors.lastname}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="company-signup">Company</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.company && errors.company)}
                        id="company-signup"
                        value={values.company}
                        name="company"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Demo Inc."
                        inputProps={{}}
                      />
                      {touched.company && errors.company && (
                        <FormHelperText error id="helper-text-company-signup">
                          {errors.company}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                        id="email-login"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="john@gmail.com"
                        inputProps={{}}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error id="helper-text-email-signup">
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={3}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        startIcon={<Iconify icon={action === "add" ? 'eva:plus-fill' : 'eva:edit-fill'} />}
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        {action} Alert
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

export default AlertsForm;
