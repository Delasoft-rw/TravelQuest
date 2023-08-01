import { useEffect, useState } from 'react';

// material-ui
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
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
import { strengthColor, strengthIndicator } from '../../utils/password-strength';

// assets
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Iconify from '../../components/Iconify';
import { CircularProgress, enqueueSnackbar, isUserAdmin } from 'utils/index';
import { axios } from 'utils/axios.interceptor';

const AgentsForm = ({ toggleModal, action, refresh = () => {} }) => {
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

    const handleOnSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log('submitting');
        try {
            setStatus({ success: false });
            setSubmitting(true);
            enqueueSnackbar('Submitting...', { variant: 'info' });

            // const URL = action === 'Add' ? '/auth/add-user' : '/auth/edit-user'
            // const method = action === 'Add' ? 'post' : 'put'
            await axios.post('/auth/add-user', {
                ...values,
                ...(isUserAdmin()
                    ? {}
                    : {
                          role_id: 117
                      })
            });

            enqueueSnackbar('Added Agent', { variant: 'success' });
        } catch (err) {
            const errMessage = err.response ? err.response.data.error ?? err.message : 'Something Went Wrong';
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: errMessage });
            enqueueSnackbar(errMessage, { variant: 'error' });
        } finally {
            toggleModal();
            setSubmitting(false);
            refresh();
        }
    };

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <>
            <Grid
                container
                spacing={3}
                sx={{
                    maxHeight: '80vh'
                }}
            >
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
                        <Typography variant="h3">{action} Agent</Typography>
                        <Typography onClick={toggleModal} variant="h3">
                            <Iconify color="red" icon={'eva:close-circle-fill'} />
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} sx={{ pb: 2 }}>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            address: '',
                            mobileTelephone: '',
                            workTelephone: '',
                            dob: '',
                            gender: '',
                            nationality: '',
                            nid: '',
                            passport: '',
                            language: '',
                            placeOfIssue: '',
                            workEmail: '',
                            password: '',
                            email: '',
                            username: '',
                            ...(isUserAdmin() ? { role_id: '' } : {}),
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            firstName: Yup.string().max(255).required('First Name is required'),
                            username: Yup.string().max(255).required('username is required'),
                            lastName: Yup.string().max(255).required('Last Name is required'),
                            address: Yup.string().max(255).required('Address is required'),
                            mobileTelephone: Yup.string().max(255).required('Mobile Telephone is required'),
                            workTelephone: Yup.string().max(255).required('Work Telephone is required'),
                            dob: Yup.string().max(255).required('Date of Birth is required'),
                            gender: Yup.string().max(255).required('Gender is required'),
                            nationality: Yup.string().max(255).required('Nationality is required'),
                            nid: Yup.string().max(255).required('National ID is required'),
                            passport: Yup.string().max(255).required('Passport is required'),
                            language: Yup.string().max(255).required('Language is required'),
                            placeOfIssue: Yup.string().max(255).required('Place of Issue is required'),
                            workEmail: Yup.string().email('Must be a valid email').max(255).required('Work Email is required'),
                            ...(isUserAdmin() ? { role_id: Yup.string().required('User Type is required') } : {})
                        })}
                        onSubmit={handleOnSubmit}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="name-signup">First Name*</InputLabel>
                                            <OutlinedInput
                                                id="firstname-login"
                                                type="text"
                                                value={values.firstName}
                                                name="firstName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="John"
                                                fullWidth
                                                error={Boolean(touched.firstName && errors.firstName)}
                                            />
                                            {touched.firstName && errors.firstName && (
                                                <FormHelperText error id="helper-text-name-signup">
                                                    {errors.firstName}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="name-signup">Last Name*</InputLabel>
                                            <OutlinedInput
                                                id="lastname-login"
                                                type="text"
                                                value={values.lastName}
                                                name="lastName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="John"
                                                fullWidth
                                                error={Boolean(touched.lastName && errors.lastName)}
                                            />
                                            {touched.lastName && errors.lastName && (
                                                <FormHelperText error id="helper-text-name-signup">
                                                    {errors.lastName}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    {isUserAdmin() && (
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="role_id">User Type*</InputLabel>
                                                <Select
                                                    name="role_id"
                                                    labelId="role_id"
                                                    id="role_id"
                                                    value={values.role_id}
                                                    label="role_id"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(touched.role_id && errors.role_id)}
                                                >
                                                    <MenuItem value="117">Client</MenuItem>
                                                    <MenuItem value="118">Agent</MenuItem>
                                                </Select>
                                                {touched.role_id && errors.role_id && (
                                                    <FormHelperText error id="helper-text-role_id-signup">
                                                        {errors.role_id}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                    )}
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="name-signup">Username*</InputLabel>
                                            <OutlinedInput
                                                id="username-login"
                                                type="text"
                                                value={values.username}
                                                name="username"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="John"
                                                fullWidth
                                                error={Boolean(touched.username && errors.username)}
                                            />
                                            {touched.username && errors.username && (
                                                <FormHelperText error id="helper-text-name-signup">
                                                    {errors.username}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email-signup">address*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.address && errors.address)}
                                                id="address-signup"
                                                type="text"
                                                value={values.address}
                                                name="address"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Doe"
                                                inputProps={{}}
                                            />
                                            {touched.address && errors.address && (
                                                <FormHelperText error id="helper-text-address-signup">
                                                    {errors.address}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="phone-signup">Mobile Phone Number*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.mobileTelephone && errors.mobileTelephone)}
                                                id="mobileTelephone-signup"
                                                type="tel"
                                                value={values.mobileTelephone}
                                                name="mobileTelephone"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.mobileTelephone && errors.mobileTelephone && (
                                                <FormHelperText error id="helper-text-mobileTelephone-signup">
                                                    {errors.mobileTelephone}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="phone-signup">Work Phone Number*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.workTelephone && errors.workTelephone)}
                                                id="workTelephone-signup"
                                                type="tel"
                                                value={values.workTelephone}
                                                name="workTelephone"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.workTelephone && errors.workTelephone && (
                                                <FormHelperText error id="helper-text-workTelephone-signup">
                                                    {errors.workTelephone}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="dob-signup">Date Of Birth</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.dob && errors.dob)}
                                                id="dob-signup"
                                                value={values.dob}
                                                type="date"
                                                name="dob"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.dob && errors.dob && (
                                                <FormHelperText error id="helper-text-dob-signup">
                                                    {errors.dob}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="gender">Gender*</InputLabel>
                                            <Select
                                                name="gender"
                                                labelId="gender"
                                                id="gender"
                                                value={values.gender}
                                                label="Gender"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={Boolean(touched.gender && errors.gender)}
                                            >
                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                                <MenuItem value="other">Other</MenuItem>
                                            </Select>
                                            {touched.gender && errors.gender && (
                                                <FormHelperText error id="helper-text-gender-signup">
                                                    {errors.gender}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="nationality">Nationality*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.nationality && errors.nationality)}
                                                id="nationality"
                                                type="text"
                                                value={values.nationality}
                                                name="nationality"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.nationality && errors.nationality && (
                                                <FormHelperText error id="helper-text-nationality-signup">
                                                    {errors.nationality}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="nid">National ID*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.nid && errors.nid)}
                                                id="nid"
                                                type="number"
                                                value={values.nid}
                                                name="nid"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.nid && errors.nid && (
                                                <FormHelperText error id="helper-text-nid-signup">
                                                    {errors.nid}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="address">Passport*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.passport && errors.passport)}
                                                id="passport"
                                                type="text"
                                                value={values.passport}
                                                name="passport"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.passport && errors.passport && (
                                                <FormHelperText error id="helper-text-passport-signup">
                                                    {errors.passport}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="language">Language*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
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
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="placeOfIssue">Place Of Issue*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.placeOfIssue && errors.placeOfIssue)}
                                                id="placeOfIssue"
                                                type="text"
                                                value={values.placeOfIssue}
                                                name="placeOfIssue"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.placeOfIssue && errors.placeOfIssue && (
                                                <FormHelperText error id="helper-text-placeOfIssue-signup">
                                                    {errors.placeOfIssue}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="workEmail">Work Email*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.workEmail && errors.workEmail)}
                                                id="workEmail"
                                                type="email"
                                                value={values.workEmail}
                                                name="workEmail"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.workEmail && errors.workEmail && (
                                                <FormHelperText error id="helper-text-workEmail-signup">
                                                    {errors.workEmail}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email">Email*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.email && errors.email)}
                                                id="email"
                                                type="email"
                                                value={values.email}
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText error id="helper-text-email-signup">
                                                    {errors.email}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    {action === 'Add' && (
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="password-signup">Password</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    error={Boolean(touched.password && errors.password)}
                                                    id="password-signup"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={values.password}
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        changePassword(e.target.value);
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                                size="large"
                                                            >
                                                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    placeholder="******"
                                                    inputProps={{}}
                                                />
                                                {touched.password && errors.password && (
                                                    <FormHelperText error id="helper-text-password-signup">
                                                        {errors.password}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                            <FormControl fullWidth sx={{ mt: 2 }}>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item>
                                                        <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" fontSize="0.75rem">
                                                            {level?.label}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </FormControl>
                                        </Grid>
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
                                            >
                                                {action} Agent
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

export default AgentsForm;
