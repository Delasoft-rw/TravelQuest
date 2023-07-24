
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

const ClientsForm = ({ toggleModal, action, initialData }) => {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
                        <Typography variant="h3">{action} Client</Typography>
                        <Typography onClick={toggleModal} variant="h3">
                            <Iconify color="red" icon={'eva:close-circle-fill'} />
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{
                            firstName:  initialData?.firstName ?? '',
                            lastName:  initialData?.lastName ?? '',
                            mobileTelephone:  initialData?.mobileTelephone ?? '',
                            workTelephone:  initialData?.workTelephone ?? '',
                            workEmail:  initialData?.workEmail ?? '',
                            address:  initialData?.address ?? '',
                            nationality:  initialData?.nationality ?? '',
                            placeOfIssue:  initialData?.placeOfIssue ?? '',
                            dob:  initialData?.dob ?? '',
                            gender:  initialData?.gender ?? '',
                            shift:  initialData?.shift ?? '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().max(255).required('First Name is required'),
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
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
                                            <InputLabel htmlFor="name">Full Name*</InputLabel>
                                            <OutlinedInput
                                                id="name"
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
                                            <InputLabel htmlFor="address">Address*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.address && errors.address)}
                                                id="address"
                                                type="address"
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
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="phone1">Phone 1*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.phone1 && errors.phone1)}
                                                id="phone1"
                                                type="tel"
                                                value={values.phone1}
                                                name="phone1"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.phone1 && errors.phone1 && (
                                                <FormHelperText error id="helper-text-phone1-signup">
                                                    {errors.phone1}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="phon2">Phone 2*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.phon2 && errors.phon2)}
                                                id="phon2"
                                                type="tel"
                                                value={values.phon2}
                                                name="phon2"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.phon2 && errors.phon2 && (
                                                <FormHelperText error id="helper-text-phon2-signup">
                                                    {errors.phon2}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="personal_email">Personal Email*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.personal_email && errors.personal_email)}
                                                id="personal_email"
                                                type="email"
                                                value={values.personal_email}
                                                name="personal_email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.personal_email && errors.personal_email && (
                                                <FormHelperText error id="helper-text-personal_email-signup">
                                                    {errors.personal_email}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="work_email">Work Email*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.work_email && errors.work_email)}
                                                id="work_email"
                                                type="email"
                                                value={values.work_email}
                                                name="work_email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.work_email && errors.work_email && (
                                                <FormHelperText error id="helper-text-work_email-signup">
                                                    {errors.work_email}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="nationality">Nationaity*</InputLabel>
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
                                            <InputLabel htmlFor="place_of_issue">Place Of Isue*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.place_of_issue && errors.place_of_issue)}
                                                id="place_of_issue"
                                                type="text"
                                                value={values.place_of_issue}
                                                name="place_of_issue"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.place_of_issue && errors.place_of_issue && (
                                                <FormHelperText error id="helper-text-place_of_issue-signup">
                                                    {errors.place_of_issue}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="dob">Date of birth*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.dob && errors.dob)}
                                                id="dob"
                                                type="date"
                                                value={values.dob}
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

export default ClientsForm;
