// material-ui
import { Grid } from '@mui/material';

// project import
import Logo from 'components/Logo/Logo';
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

const Login = () => (
    <AuthWrapper>
        <Grid container spacing={3}>
            <div className="w-full flex flex-col items-center justify-center">
                <Logo />
                {/* <Typography variant="h3">Login</Typography> */}
            </div>
            <Grid item xs={12}>
                <AuthLogin />
            </Grid>
        </Grid>
    </AuthWrapper>
);

export default Login;
