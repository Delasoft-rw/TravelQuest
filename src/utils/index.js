import { enqueueSnackbar, closeSnackbar } from 'notistack';
import { CircularProgress as CircularProgressComponent } from '@mui/material';
import { axios } from './axios.interceptor';

const getUserInfo = () => {
    try {
        return JSON.parse(localStorage.getItem('user') ?? '{}');
    } catch (error) {
        return {};
    }
};

const CircularProgress = () => {
    return <CircularProgressComponent size={20} thickness={5} />;
};

const handleLogout = async () => {
    try {
        await axios.get('/auth/logout', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        
    } catch (e) {
        // enqueueSnackbar('Logout Failed', { variant: 'error' });
        console.log(e.response ? e.response.data.error ?? e.message : 'Something Went Wrong');
    } finally {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
    }
};

export { enqueueSnackbar, closeSnackbar, CircularProgress, getUserInfo, handleLogout };
