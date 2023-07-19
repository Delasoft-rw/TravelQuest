
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

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project import
import AnimateButton from '../../components/@extended/AnimateButton';

// assets
import Iconify from '../../components/Iconify';


const AlertsForm = ({ toggleModal, action, action_label, currentTable }) => {

  return (
      <>
          <Grid spacing={3}>
              <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
                      <Typography variant="h3">{action_label}</Typography>
                      <Typography onClick={toggleModal} variant="h3">
                          <Iconify color="red" icon={'eva:close-circle-fill'} />
                      </Typography>
                  </Stack>
              </Grid>
              <Grid item xs={12}>
                  <Formik
                      initialValues={{
                        name: '',
                          body: '',
                          time: '',
                          submit: null
                      }}
                      validationSchema={Yup.object().shape({
                          body: Yup.string().max(255).required('Body is required')
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
                                  {currentTable === 'templates' ? (
                                      <>
                                          <Grid item xs={12}>
                                              <Stack spacing={1}>
                                                  <InputLabel htmlFor="body">Body*</InputLabel>
                                                  <OutlinedInput
                                                      fullWidth
                                                      multiline
                                                      error={Boolean(touched.body && errors.body)}
                                                      id="body"
                                                      type="text"
                                                      value={values.body}
                                                      name="body"
                                                      onBlur={handleBlur}
                                                      onChange={handleChange}
                                                      placeholder=""
                                                      inputProps={{}}
                                                  />
                                                  {touched.body && errors.body && (
                                                      <FormHelperText error id="helper-text-body-signup">
                                                          {errors.body}
                                                      </FormHelperText>
                                                  )}
                                              </Stack>
                                          </Grid>
                                          <Grid item xs={12}>
                                              <Stack spacing={1}>
                                                  <InputLabel htmlFor="time">Time*</InputLabel>
                                                  <OutlinedInput
                                                      fullWidth
                                                      error={Boolean(touched.time && errors.time)}
                                                      id="time"
                                                      type="date"
                                                      value={values.time}
                                                      name="time"
                                                      onBlur={handleBlur}
                                                      onChange={handleChange}
                                                      placeholder=""
                                                      inputProps={{}}
                                                  />
                                                  {touched.time && errors.time && (
                                                      <FormHelperText error id="helper-text-time-signup">
                                                          {errors.time}
                                                      </FormHelperText>
                                                  )}
                                              </Stack>
                                          </Grid>
                                      </>
                                  ) : (
                                      currentTable === 'call_types' && (
                                          <>
                                              <Grid item xs={12}>
                                                  <Stack spacing={1}>
                                                      <InputLabel htmlFor="name">Call type*</InputLabel>
                                                      <OutlinedInput
                                                          fullWidth
                                                          error={Boolean(touched.name && errors.name)}
                                                          id="name"
                                                          type="text"
                                                          value={values.name}
                                                          name="name"
                                                          onBlur={handleBlur}
                                                          onChange={handleChange}
                                                          placeholder=""
                                                          inputProps={{}}
                                                      />
                                                      {touched.name && errors.name && (
                                                          <FormHelperText error id="helper-text-name-signup">
                                                              {errors.name}
                                                          </FormHelperText>
                                                      )}
                                                  </Stack>
                                              </Grid>
                                          </>
                                      )
                                  )}

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
                                              startIcon={<Iconify icon={action === 'add' ? 'eva:plus-fill' : 'eva:edit-fill'} />}
                                              size="large"
                                              type="submit"
                                              variant="contained"
                                              color="primary"
                                              className="bg-primary"
                                          >
                                              Save
                                          </Button>
                                      </AnimateButton>
                                  </Grid>
                              </Grid>
                          </form>
                      )}
                  </Formik>
              </Grid>
          </Grid>
      </>
  );
};

export default AlertsForm;
