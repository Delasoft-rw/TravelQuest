import Axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { Button } from '@mui/material';

export const axios = Axios.create({
    baseURL: 'https://backend.travel-quest.biz/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

axios.interceptors.response.use(
    (res) => res,
    (err) => {
        enqueueSnackbar(err.response ? err.response.data.error ?? err.message : 'Something Went Wrong');
        if(err.response && err.response.status === 401){
            enqueueSnackbar('Try Logging In Again', {
                action : () => (<>
                    <Button onClick={() => {
                        window.location.pathname = '/login'
                    }} >Login Again</Button>
                </>)
            })
        }
        return Promise.reject(err);
    }
);
