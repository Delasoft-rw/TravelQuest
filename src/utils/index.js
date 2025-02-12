import { enqueueSnackbar, closeSnackbar } from 'notistack';
import { CircularProgress as CircularProgressComponent } from '@mui/material';
import { axios } from './axios.interceptor';

const getUserInfo = () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('user') ?? '{}')
        // if(!userInfo.isTravelQuest && window.location.pathname !== '/login') return window.location.pathname = '/login'
        return userInfo;
    } catch (error) {
        return {};
    }
};

const isUserAdmin = () => {
    const roles = getUserInfo().roles;
    if(roles) {
        return roles.some(el => el.name.toLowerCase() === 'admin')
    } else {
        return false
    }
}

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

const camelToNormal = (val = '') =>
  val.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^([a-z])/, (res) => res.toUpperCase());

export { enqueueSnackbar, closeSnackbar, CircularProgress, getUserInfo, handleLogout, camelToNormal, isUserAdmin };
