import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import { ReactSVG } from 'react-svg';

// assets
import LoginSvg  from 'assets/images/undraw_unlock_re_a558.svg';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
    <>
        <div className="flex align-center justify-center">
            <div className="hidden md:flex w-1/2 h-screen bg-white items-center justify-center gap-10 flex-col">
                <h2 className='text-xl text-gray-700 font-medium font-inter'>Almost there, <br /> Enter your credentials to have access.</h2>
                <ReactSVG src={LoginSvg} className="" />
            </div>
            <div className="w-full md:w-1/2 h-screen bg-primary flex align-center justify-center flex-col">
                <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
                >
                    <Grid item>
                        <AuthCard>{children}</AuthCard>
                    </Grid>
                </Grid>
            </div>
        </div>
    </>
);

AuthWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthWrapper;
