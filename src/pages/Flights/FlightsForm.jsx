
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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// assets
import Iconify from '../../components/Iconify';
import React from 'react';
import { axios } from 'utils/axios.interceptor';
import { CircularProgress, closeSnackbar, enqueueSnackbar, getUserInfo } from 'utils/index';
import dayjs from 'dayjs';

const FlightsForm = ({ toggleModal, action, initialData = {}, refresh = () => { } }) => {
    const [callTypes, setCallTypes] = React.useState([]);
    const [alertTemplates, setAlertTemplates] = React.useState([]);
    const [airplanes, setAirplanes] = React.useState([]);
    const [clients, setClients] = React.useState([]);

    const getCallTypes = async () => {
        try {
            const { data } = await axios.get('/constant/all-call-types');
            setCallTypes(data.map((el) => ({ ...el })));
        } catch (e) {
            console.log(e);
        }
    };

    const getAlertTemplates = async () => {
        try {
            const { data } = await axios.get('/template/all-alert-templates');
            setAlertTemplates(data.data.map((el) => ({ ...el })));
        } catch (e) {
            console.log(e);
        }
    };

    const getAirplanes = async () => {
        try {
            const { data } = await axios.get('/constant/all-airplanes');
            setAirplanes(data.map((el) => ({ ...el })));
        } catch (e) {
            console.log(e);
        }
    };

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
            await getCallTypes();
            await getAlertTemplates();
            await getAirplanes();
            await getClients();

            closeSnackbar(key)

        } catch (e) {
            console.log(e)
        }
    }

    const handleOnSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            setStatus({ success: false });
            setSubmitting(true);
            enqueueSnackbar('Submitting...', { variant: 'info' })

            const URL = action === 'Add' ? '/flight-schedule/add' : '/flight-schedule/edit/' + initialData.id
            const method = action === 'Add' ? 'post' : 'put'
            await axios[method](URL, {
                ...values,
                user_id: getUserInfo().id
            })

            enqueueSnackbar(`${action}ed Flight Schedule`, { variant: 'success' })

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


    React.useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
                        <Typography variant="h3">{action} Flight</Typography>
                        <Typography onClick={toggleModal} variant="h3">
                            <Iconify color="red" icon={'eva:close-circle-fill'} />
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{
                            flight_number: initialData.flight_number ?? '',
                            // departure_airport: initialData.departure_airport ?? '',
                            // arrival_airport: initialData.arrival_airport ?? '',
                            departure_time: initialData.departure_time ?? '',
                            // arrival_time: initialData.arrival_time ?? '',
                            // status: initialData.status ?? '',
                            caller_type_id: initialData.caller_type_id ?? '',
                            airplane_id: initialData.airplane_id ?? '',
                            alert_template_id: initialData.alert_template_id ?? '',
                            ticket_number: initialData.ticket_number ?? '',
                            // counter: initialData.counter ?? '',
                            userdetails_id: initialData.userdetails_id ?? '',
                            submit: null,
                        }}
                        validationSchema={Yup.object().shape({
                            flight_number: Yup.string().max(255),
                            // departure_airport: Yup.string().max(255),
                            // arrival_airport: Yup.string().max(255),
                            departure_time: Yup.date().required('Departure Time is required'),
                            // arrival_time: Yup.date(),
                            // status: Yup.string().max(255).required('Status is required'),
                            caller_type_id: Yup.string().max(255).required('Caller Type ID is required'),
                            airplane_id: Yup.string().max(255),
                            alert_template_id: Yup.string().max(255).required('Alert Template ID is required'),
                            ticket_number: Yup.string().max(255),
                            // counter: Yup.number().required('Counter is required'),
                            userdetails_id: Yup.number().required('Client is required'),
                        })}
                        onSubmit={handleOnSubmit}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="userdetails_id">Client*</InputLabel>
                                            <Select

                                                id="userdetails_id"
                                                name="userdetails_id"
                                                value={values.userdetails_id}
                                                onChange={handleChange}
                                            >
                                                {
                                                    clients.map((el) => (
                                                        <MenuItem key={el.id} value={el.id}>{el.lastName} {el.firstName}</MenuItem>
                                                    ))

                                                }

                                            </Select>
                                            {touched.userdetails_id && errors.userdetails_id && (
                                                <FormHelperText error id="helper-text-caller_type-signup">
                                                    {errors.userdetails_id}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="flight_number">Flight Number</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="flight_number"
                                                id="flight_number"
                                                type="text"
                                                value={values.flight_number}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.flight_number && errors.flight_number)}
                                            />
                                            {touched.flight_number && errors.flight_number && (
                                                <FormHelperText error id="helper-text-flight_number-signup">
                                                    {errors.flight_number}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    {/* <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="departure_airport">Departure Airport</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="departure_airport"

                                                id="departure_airport"
                                                type="text"
                                                value={values.departure_airport}

                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.departure_airport && errors.departure_airport)}
                                            />
                                            {touched.departure_airport && errors.departure_airport && (
                                                <FormHelperText error id="helper-text-departure_airport-signup">
                                                    {errors.departure_airport}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid> */}
                                    {/* <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="arrival_airport">Arrival Airport</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="arrival_airport"

                                                id="arrival_airport"
                                                type="text"
                                                value={values.arrival_airport}

                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.arrival_airport && errors.arrival_airport)}
                                            />
                                            {touched.arrival_airport && errors.arrival_airport && (
                                                <FormHelperText error id="helper-text-arrival_airport-signup">
                                                    {errors.arrival_airport}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid> */}
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="departure_time">Departure Time*</InputLabel>
                                            <DateTimePicker
                                                name="departure_time"
                                                id="departure_time"
                                                value={values.departure_time}
                                                onBlur={handleBlur}
                                                onChange={(...args) => {
                                                    handleChange({
                                                        target: {
                                                            name: 'departure_time',
                                                            value: dayjs(args[0]).format('YYYY-MM-DD HH:mm:ss')
                                                        }
                                                    })
                                                }}
                                                error={Boolean(touched.departure_time && errors.departure_time)}
                                            />
                                            {touched.departure_time && errors.departure_time && (
                                                <FormHelperText error id="helper-text-departure_time-signup">
                                                    {errors.departure_time}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    {/* <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="arrival_time">Arrival Time</InputLabel>
                                            <DateTimePicker
                                                name="arrival_time"
                                                id="arrival_time"
                                                value={values.arrival_time}
                                                onBlur={handleBlur}
                                                onChange={(...args) => {
                                                    handleChange({
                                                        target: {
                                                            name: 'arrival_time',
                                                            value: dayjs(args[0]).format('YYYY-MM-DD HH:mm:ss')
                                                        }
                                                    })
                                                }}
                                                error={Boolean(touched.arrival_time && errors.arrival_time)}
                                            />
                                            {touched.arrival_time && errors.arrival_time && (
                                                <FormHelperText error id="helper-text-arrival_time-signup">
                                                    {errors.arrival_time}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid> */}
                                    {/* <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="status">Status*</InputLabel>
                                            <Select

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
                                    </Grid> */}
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="caller_type_id">Call Type*</InputLabel>
                                            <Select

                                                id="caller_type_id"
                                                name="caller_type_id"
                                                value={values.caller_type_id}
                                                onChange={handleChange}
                                            >
                                                {
                                                    callTypes.map((el) => (
                                                        <MenuItem key={el.id} value={el.id}>{el.name} hours</MenuItem>
                                                    ))

                                                }

                                            </Select>
                                            {touched.caller_type_id && errors.caller_type_id && (
                                                <FormHelperText error id="helper-text-caller_type-signup">
                                                    {errors.caller_type_id}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="airplane_id">Airplane</InputLabel>
                                            <Select

                                                id="airplane_id"
                                                name="airplane_id"
                                                value={values.airplane_id}
                                                onChange={handleChange}
                                            >
                                                {
                                                    airplanes.map((el) => (
                                                        <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                                                    ))

                                                }

                                            </Select>
                                            {touched.airplane_id && errors.airplane_id && (
                                                <FormHelperText error id="helper-text-airplane_id-signup">
                                                    {errors.airplane_id}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="alert_template_id">alert_template*</InputLabel>
                                            <Select

                                                id="alert_template_id"
                                                name="alert_template_id"
                                                value={values.alert_template_id}
                                                onChange={handleChange}
                                            >
                                                {
                                                    alertTemplates.map((el) => (
                                                        <MenuItem key={el.id} value={el.id}>{el.title}</MenuItem>
                                                    ))

                                                }

                                            </Select>
                                            {touched.alert_template_id && errors.alert_template_id && (
                                                <FormHelperText error id="helper-text-alert_template_id-signup">
                                                    {errors.alert_template_id}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="ticket_number">Ticket Number</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="ticket_number"

                                                id="ticket_number"
                                                type="text"
                                                value={values.ticket_number}

                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.ticket_number && errors.ticket_number)}
                                            />
                                            {touched.ticket_number && errors.ticket_number && (
                                                <FormHelperText error id="helper-text-ticket_number-signup">
                                                    {errors.ticket_number}
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

export default FlightsForm;
