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
    Select,
    MenuItem,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from '../../components/@extended/AnimateButton';

// assets
import Iconify from '../../components/Iconify';

const FlightsForm = ({ toggleModal, action }) => {
    return (
        <>
            <Grid spacing={3}>
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
                            client: '',
                            callType: '',
                            messageTemplate: '',
                            timestamp: '',
                            plane: '',
                            ticketId: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            firstname: Yup.string().max(255).required('First Name is required'),
                            lastname: Yup.string().max(255).required('Last Name is required'),
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
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
                                            <InputLabel htmlFor="client">Client*</InputLabel>
                                            <Select
                                                name="client"
                                                labelId="client"
                                                id="client"
                                                value={values.client}
                                                label="client"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.client && errors.client)}
                                            >
                                                <MenuItem value="1234">John Doe</MenuItem>
                                                <MenuItem value="2345">Jane Doe</MenuItem>
                                            </Select>
                                            {touched.client && errors.client && (
                                                <FormHelperText error id="helper-text-client-signup">
                                                    {errors.client}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="callType">Call Type*</InputLabel>
                                            <Select
                                                name="callType"
                                                labelId="callType"
                                                id="callType"
                                                value={values.callType}
                                                label="callType"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.callType && errors.callType)}
                                            >
                                                <MenuItem value="1234">Hourly</MenuItem>
                                                <MenuItem value="2345">Every 30 minutes</MenuItem>
                                            </Select>
                                            {touched.callType && errors.callType && (
                                                <FormHelperText error id="helper-text-callType-signup">
                                                    {errors.callType}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="messageTemplate">Message Template*</InputLabel>
                                            <Select
                                                name="messageTemplate"
                                                labelId="messageTemplate"
                                                id="messageTemplate"
                                                value={values.messageTemplate}
                                                label="messageTemplate"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.messageTemplate && errors.messageTemplate)}
                                            >
                                                <MenuItem value="1234">Flight Reminder</MenuItem>
                                                <MenuItem value="2345">Birthday Wishes</MenuItem>
                                            </Select>
                                            {touched.messageTemplate && errors.messageTemplate && (
                                                <FormHelperText error id="helper-text-messageTemplate-signup">
                                                    {errors.messageTemplate}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="plaine">Aeroplane*</InputLabel>
                                            <Select
                                                name="plaine"
                                                labelId="plaine"
                                                id="plaine"
                                                value={values.plaine}
                                                label="plaine"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.plaine && errors.plaine)}
                                            >
                                                <MenuItem value="1234">34KDD Rw</MenuItem>
                                                <MenuItem value="2345">4ddxd Quartar</MenuItem>
                                            </Select>
                                            {touched.plaine && errors.plaine && (
                                                <FormHelperText error id="helper-text-plaine-signup">
                                                    {errors.plaine}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="ticketId">Ticket*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="ticketId"
                                                labelId="ticketId"
                                                id="ticketId"
                                                type="text"
                                                value={values.ticketId}
                                                label="ticketId"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.ticketId && errors.ticketId)}
                                            />
                                            {touched.ticketId && errors.ticketId && (
                                                <FormHelperText error id="helper-text-ticketId-signup">
                                                    {errors.ticketId}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="timestamp">Time of Departure*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.timestamp && errors.timestamp)}
                                                id="timestamp"
                                                type="date"
                                                value={values.timestamp}
                                                name="timestamp"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.timestamp && errors.timestamp && (
                                                <FormHelperText error id="helper-text-timestamp-signup">
                                                    {errors.timestamp}
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

export default FlightsForm;
