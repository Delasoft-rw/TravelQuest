
// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    TextareaAutosize
} from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project import
import AnimateButton from '../../components/@extended/AnimateButton';

// assets
import Iconify from '../../components/Iconify';
import { CircularProgress, enqueueSnackbar, getUserInfo } from 'utils/index';
import { axios } from 'utils/axios.interceptor';
import { MenuItem, Select } from '@mui/material/index';


const AlertsForm = ({ toggleModal, action, action_label, currentTable, refresh = () => { }, initialData = {} }) => {
    const handleOnSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            setStatus({ success: false });
            setSubmitting(true);
            enqueueSnackbar('Submitting...', { variant: 'info' })

            const URL = action === 'Add' ? `/${currentTable === 'templates' ? 'template/add-alert-template' : 'constant/add-call-type'}` : `/${currentTable === 'templates' ? 'template/edit-alert-template' : 'constant/edit-call-type'}/` + initialData.id
            const method = action === 'Add' ? 'post' : 'put'

            await axios[method](URL, {
                ...values,
                user_id: getUserInfo().id
            })

            enqueueSnackbar(`${action}ed ${currentTable === 'templates' ? 'Alert Template' : 'Call Type'}`, { variant: 'success' })

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
    }

    return (
        <>
            <Grid container spacing={3}>
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
                        initialValues={
                            currentTable === 'templates' ? {
                                language: initialData.language ?? '',
                                title: initialData.title ?? '',
                                body: initialData.body ?? '',
                                submit: null,
                            } : {
                                name: initialData.name ?? '',
                                type: initialData.type ?? '',
                                status: initialData.status ?? '',
                                submit: null,
                            }
                        }
                        validationSchema={Yup.object().shape(
                            currentTable === 'templates' ? {
                                language: Yup.string().required('Language is required'),
                                title: Yup.string().required('Title is required'),
                                body: Yup.string().required('Body is required'),
                            } : {
                                name: Yup.string().required('Name is required'),
                                type: Yup.string().required('Type is required'),
                                status: Yup.string().required('Status is required'),
                            }
                        )}
                        onSubmit={handleOnSubmit}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    {currentTable === 'templates' ? (
                                        <>
                                            <Grid item xs={12}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="language">Language*</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        multiline
                                                        error={Boolean(touched.language && errors.language)}
                                                        id="language"
                                                        type="text"
                                                        value={values.language}
                                                        name="language"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder=""
                                                        inputProps={{}}
                                                    />
                                                    {touched.language && errors.language && (
                                                        <FormHelperText error id="helper-text-language-signup">
                                                            {errors.language}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="title">Title*</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth
                                                        multiline
                                                        error={Boolean(touched.title && errors.title)}
                                                        id="title"
                                                        type="text"
                                                        value={values.title}
                                                        name="title"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder=""
                                                        inputProps={{}}
                                                    />
                                                    {touched.title && errors.title && (
                                                        <FormHelperText error id="helper-text-title-signup">
                                                            {errors.title}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="body">Body*</InputLabel>
                                                    <TextareaAutosize
                                                        // fullWidth
                                                        minRows={3}
                                                        error={errors.body}
                                                        id="body-signup"
                                                        type="body"
                                                        value={values.body}
                                                        name="body"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Short body of Product"
                                                        style={{
                                                            border: !Boolean(touched.body && errors.body) ? '1px solid #c4c4c4' : '1px solid #f14343',
                                                            borderRadius: '5px',
                                                            padding: '15px',
                                                            outline: 'none',
                                                            fontFamily: 'unset'
                                                        }}
                                                    />
                                                    {touched.body && errors.body && (
                                                        <FormHelperText error id="helper-text-body-signup">
                                                            {errors.body}
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
                                                        <InputLabel htmlFor="name">Name*</InputLabel>
                                                        <Select
                                                            labelId="select-label"
                                                            id="name"
                                                            name="name"
                                                            value={values.name}
                                                            onChange={handleChange}
                                                        >
                                                            {
                                                                Array.from({ length: 10 }, (_, i) => i + 1).map(el => (
                                                                    <MenuItem key={el} value={el}>{el} hours</MenuItem>
                                                                ))
                                                            }

                                                        </Select>
                                                        {touched.name && errors.name && (
                                                            <FormHelperText error id="helper-text-name-signup">
                                                                {errors.name}
                                                            </FormHelperText>
                                                        )}
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="type">Type*</InputLabel>
                                                        <OutlinedInput
                                                            id="type-login"
                                                            type="text"
                                                            value={values.type}
                                                            name="type"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            placeholder="e.g: reminder"
                                                            fullWidth
                                                            error={Boolean(touched.type && errors.type)}
                                                        />
                                                        {touched.type && errors.type && (
                                                            <FormHelperText error id="helper-text-type-signup">
                                                                {errors.type}
                                                            </FormHelperText>
                                                        )}
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="status">status*</InputLabel>
                                                        <Select
                                                            labelId="select-label"
                                                            id="status"
                                                            name="status"
                                                            value={values.status}
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={'active'}>Active</MenuItem>
                                                            <MenuItem value={'inactive'}>Inactive</MenuItem>

                                                        </Select>
                                                        {touched.status && errors.status && (
                                                            <FormHelperText error id="helper-text-status-signup">
                                                                {errors.status}
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

export default AlertsForm;
