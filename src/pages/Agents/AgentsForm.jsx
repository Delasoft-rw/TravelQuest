import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Box,
    Button,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    Grid,
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

const AgentsForm = ({ toggleModal, action }) => {
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
                        <Typography variant="h3">{action} Agent</Typography>
                        <Typography onClick={toggleModal} variant="h3">
                            <Iconify color="red" icon={'eva:close-circle-fill'} />
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phone: '',
                            dob: '',
                            gender: '',
                            address: '',
                            status: 'active',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().max(255).required('First Name is required'),
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            password: Yup.string().max(255).required('Password is required')
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
                                            <InputLabel htmlFor="name-signup">Full Name*</InputLabel>
                                            <OutlinedInput
                                                id="name-login"
                                                type="text"
                                                value={values.name}
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="John"
                                                fullWidth
                                                error={Boolean(touched.name && errors.name)}
                                            />
                                            {touched.name && errors.name && (
                                                <FormHelperText error id="helper-text-name-signup">
                                                    {errors.name}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email-signup">Email*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.email && errors.email)}
                                                id="email-signup"
                                                type="email"
                                                value={values.email}
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Doe"
                                                inputProps={{}}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText error id="helper-text-email-signup">
                                                    {errors.email}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="phone-signup">Phone Number*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.phone && errors.phone)}
                                                id="phone-signup"
                                                type="tel"
                                                value={values.phone}
                                                name="phone"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.phone && errors.phone && (
                                                <FormHelperText error id="helper-text-phone-signup">
                                                    {errors.phone}
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
