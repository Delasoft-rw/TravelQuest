
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
import { axios } from 'utils/axios.interceptor';
import { CircularProgress, enqueueSnackbar, getUserInfo } from 'utils/index';
import Iconify from '../../components/Iconify';


const PlanesForm = ({ toggleModal, action, action_label, currentTable, refresh = () => {}, initialData = {} }) => {
    const handleOnSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            setStatus({ success: false });
            setSubmitting(true);
            enqueueSnackbar('Submitting...', { variant: 'info' })

            const URL = action === 'Add' ? '/constant/add-airplane' : '/constant/edit-airplane/' + initialData.id
            const method = action === 'Add' ? 'post' : 'put'
            await axios[method](URL, {
                ...values,
                user_id: getUserInfo().id
            })

            enqueueSnackbar(`${action}ed Airplane`, { variant: 'success' })

        } catch (err) {
            const errMessage = err.response ? err.response.data.error ?? err.message : 'Something Went Wrong';
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: errMessage });
            enqueueSnackbar(errMessage, { variant: 'error' })
        } finally {
            toggleModal();
            setSubmitting(false);
            refresh()
        }
    };
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
                        <Typography variant="h3">{action} Plane</Typography>
                        <Typography onClick={toggleModal} variant="h3">
                            <Iconify color="red" icon={'eva:close-circle-fill'} />
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{
                            name: initialData.name ?? '',
                            airplaneCode: initialData.airplaneCode ?? '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().max(255).required('Plane Name is required'),
                            airplaneCode: Yup.string().max(255).required('Airplane Code is required')
                        })}
                        onSubmit={handleOnSubmit}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="name">Name*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.name && errors.name)}
                                                id="name"
                                                type="text"
                                                value={values.name}
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="eg: Boing 747"
                                                inputProps={{}}
                                            />
                                            {touched.name && errors.name && (
                                                <FormHelperText error id="helper-text-name-signup">
                                                    {errors.name}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="airplaneCode">Airplane Code</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.airplaneCode && errors.airplaneCode)}
                                                id="airplaneCode"
                                                type="text"
                                                value={values.airplaneCode}
                                                name="airplaneCode"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="ABC123"
                                                inputProps={{}}
                                            />
                                            {touched.airplaneCode && errors.airplaneCode && (
                                                <FormHelperText error id="helper-text-airplaneCode-signup">
                                                    {errors.airplaneCode}
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
                                                startIcon={<Iconify icon={action === 'add' ? 'eva:plus-fill' : 'eva:edit-fill'} />}
                                                endIcon={isSubmitting && <CircularProgress />}
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className="bg-primary"
                                                onClick={handleSubmit}
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
