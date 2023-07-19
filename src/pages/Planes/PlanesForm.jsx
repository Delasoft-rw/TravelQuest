
// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
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


const PlanesForm = ({ toggleModal, action, action_label, currentTable }) => {

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
                          plane_name: '',
                          company_name: '',
                          address: '',
                          submit: null
                      }}
                      validationSchema={Yup.object().shape({
                          plane_name: Yup.string().max(255).required('Plane Name is required')
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
                                  {currentTable === 'aeroplanes' ? (
                                      <>
                                          <Grid item xs={12}>
                                              <Stack spacing={1}>
                                                  <InputLabel htmlFor="plane_name">Name*</InputLabel>
                                                  <OutlinedInput
                                                      fullWidth
                                                      error={Boolean(touched.plane_name && errors.plane_name)}
                                                      id="plane_name"
                                                      type="text"
                                                      value={values.plane_name}
                                                      name="plane_name"
                                                      onBlur={handleBlur}
                                                      onChange={handleChange}
                                                      placeholder=""
                                                      inputProps={{}}
                                                  />
                                                  {touched.plane_name && errors.plane_name && (
                                                      <FormHelperText error id="helper-text-plane_name-signup">
                                                          {errors.plane_name}
                                                      </FormHelperText>
                                                  )}
                                              </Stack>
                                          </Grid>
                                          <Grid item xs={12}>
                                              <Stack spacing={1}>
                                                  <InputLabel htmlFor="company_name">Owner (Company)*</InputLabel>
                                                  <Select
                                                      name="company_name"
                                                      labelId="company_name"
                                                      id="company_name"
                                                      value={values.company_name}
                                                      label="company_name"
                                                      onBlur={handleBlur}
                                                      onChange={handleChange}
                                                      error={Boolean(touched.company_name && errors.company_name)}
                                                  >
                                                      <MenuItem value="1234">Rwanda Air</MenuItem>
                                                      <MenuItem value="2345">Quartar Airways</MenuItem>
                                                  </Select>
                                                  {touched.company_name && errors.company_name && (
                                                      <FormHelperText error id="helper-text-company_name-signup">
                                                          {errors.company_name}
                                                      </FormHelperText>
                                                  )}
                                              </Stack>
                                          </Grid>
                                      </>
                                  ) : (
                                      currentTable === 'companies' && (
                                          <>
                                              <Grid item xs={12}>
                                                  <Stack spacing={1}>
                                                      <InputLabel htmlFor="company_name">Company name*</InputLabel>
                                                      <OutlinedInput
                                                          fullWidth
                                                          error={Boolean(touched.company_name && errors.company_name)}
                                                          id="company_name"
                                                          type="text"
                                                          value={values.company_name}
                                                          name="company_name"
                                                          onBlur={handleBlur}
                                                          onChange={handleChange}
                                                          placeholder=""
                                                          inputProps={{}}
                                                      />
                                                      {touched.company_name && errors.company_name && (
                                                          <FormHelperText error id="helper-text-company_name-signup">
                                                              {errors.company_name}
                                                          </FormHelperText>
                                                      )}
                                                  </Stack>
                                              </Grid>
                                              <Grid item xs={12}>
                                                  <Stack spacing={1}>
                                                      <InputLabel htmlFor="address">Address*</InputLabel>
                                                      <OutlinedInput
                                                          fullWidth
                                                          error={Boolean(touched.address && errors.address)}
                                                          id="address"
                                                          type="text"
                                                          value={values.address}
                                                          name="address"
                                                          onBlur={handleBlur}
                                                          onChange={handleChange}
                                                          placeholder=""
                                                          inputProps={{}}
                                                      />
                                                      {touched.address && errors.address && (
                                                          <FormHelperText error id="helper-text-address-signup">
                                                              {errors.address}
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

export default PlanesForm;
