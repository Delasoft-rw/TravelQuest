import { useEffect, useState } from 'react';

// material-ui
import { Box, Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';

// project import
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from '../../components/MainCard';
import Analytics from '../../components/cards/statistics/Analytics';
<<<<<<< HEAD
import { axios } from 'utils/axios.interceptor';
import { closeSnackbar, enqueueSnackbar } from 'utils/index';
=======
import { useNavigate } from 'react-router-dom';
import { isUserAdmin } from 'utils/index';
>>>>>>> 3501a0d8671d693473449b78910d48d46fc28662

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');
    const [stats, setStats] = useState({});

    const getStats = async () => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todayFormatted = today.toISOString().slice(0, 10);
        const tomorrowFormatted = tomorrow.toISOString().slice(0, 10);

        try {
            const { data } = await axios.get(`/dashboard/statistics?start_date=${todayFormatted}&end_date=${tomorrowFormatted}`);
            setStats(data);
        } catch (e) {
            console.log(e);
        }
    };

    const getData = async () => {
        try {
            const key = enqueueSnackbar('Loading Statistics...', {
                persist: true,
                variant: 'info',
            })
            await getStats();

            closeSnackbar(key)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getData();
    const navigate = useNavigate()

    useEffect(() => {
        if(!isUserAdmin()) {
            navigate('/dashboard/agents')
            // console.log('not admin')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <Analytics title="Total Agents" count={stats.agents ?? '--'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <Analytics title="Total Clients" count={stats.clients ?? '--'}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <Analytics title="Daily Flights" count={stats.flightSchedules ?? '--'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <Analytics title="Total Flights" count={stats.flightSchedules ?? '--'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <Analytics title="Monthly earnings" count="-- RWF" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <Analytics title="Anual earnings" count="-- RWF" />
            </Grid>
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
            {/* row 2 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Sales</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" alignItems="center" spacing={0}>
                            <Button
                                size="small"
                                onClick={() => setSlot('month')}
                                color={slot === 'month' ? 'primary' : 'secondary'}
                                variant={slot === 'month' ? 'outlined' : 'text'}
                            >
                                Month
                            </Button>
                            <Button
                                size="small"
                                onClick={() => setSlot('week')}
                                color={slot === 'week' ? 'primary' : 'secondary'}
                                variant={slot === 'week' ? 'outlined' : 'text'}
                            >
                                Week
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                        <IncomeAreaChart slot={slot} />
                    </Box>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Income Overview</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                This Week Statistics
                            </Typography>
                            <Typography variant="h3">300,000 RWF</Typography>
                        </Stack>
                    </Box>
                    <MonthlyBarChart />
                </MainCard>
            </Grid>
            {/* row 4 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Earnings Report</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
                        >
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                    <Stack spacing={1.5} sx={{ mb: -12 }}>
                        <Typography variant="h6" color="secondary">
                            Net Profit
                        </Typography>
                        <Typography variant="h4">2,400,000 RWF</Typography>
                    </Stack>
                    <SalesColumnChart />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
