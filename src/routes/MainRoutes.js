import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import Agents from '../pages/Agents/Agents';
import Clients from '../pages/Clients/Clients';
import Flights from '../pages/Flights/Flights';
import Alerts from '../pages/Alerts/Alerts';
import Planes from '../pages/Planes/Planes';
import Celebrations from '../pages/Celebrations/Celebrations';
import Account from '../pages/Account/Account';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'Agents',
                    element: <Agents />
                },
                {
                    path: 'Clients',
                    element: <Clients />
                },
                {
                    path: 'Flights',
                    element: <Flights />
                },
                {
                    path: 'Alerts',
                    element: <Alerts />
                },  
                {
                    path: 'Planes',
                    element: <Planes />
                },
                {
                    path: 'Celebrations',
                    element: <Celebrations />
                },
                {
                    path: 'Account',
                    element: <Account />
                }
            ]
        }
    ]
};

export default MainRoutes;
