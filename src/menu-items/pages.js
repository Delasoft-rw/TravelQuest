// assets
import { FieldTimeOutlined, UserAddOutlined, TeamOutlined, AlertOutlined } from '@ant-design/icons';
import { ReactComponent as PlaneIcon } from '../assets/images/icons/plane.svg';
import { ReactComponent as CelebrationIcon } from '../assets/images/icons/celebration.svg';

// icons
const icons = {
    FieldTimeOutlined,
    UserAddOutlined,
    TeamOutlined,
    AlertOutlined,
    PlaneIcon,
    CelebrationIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'Management',
    title: 'MANAGEMENT',
    type: 'group',
    children: [
        {
            id: 'Agents',
            title: 'Agents',
            type: 'item',
            url: '/dashboard/agents',
            icon: icons.TeamOutlined,
            breadcrumbs: false
            // target: true
        },
        {
            id: 'Clients',
            title: 'Clients',
            type: 'item',
            url: '/dashboard/clients',
            icon: icons.TeamOutlined,
            breadcrumbs: false
            // target: true
        },
        {
            id: 'Flights',
            title: 'Flights Schedule',
            type: 'item',
            url: '/dashboard/flights',
            icon: icons.FieldTimeOutlined,
            breadcrumbs: false
            // target: true
        },
        {
            id: 'Alerts',
            title: 'Alerts Templates',
            type: 'item',
            url: '/dashboard/alerts',
            icon: icons.AlertOutlined,
            breadcrumbs: false
            // target: true
        },
        {
            id: 'Planes',
            title: 'Aeropanes',
            type: 'item',
            url: '/dashboard/planes',
            icon: icons.PlaneIcon,
            breadcrumbs: false
            // target: true
        },
        {
            id: 'Celebrations',
            title: 'Celebrations',
            type: 'item',
            url: '/dashboard/celebrations',
            icon: icons.CelebrationIcon,
            breadcrumbs: false
            // target: true
        },
        {
            id: 'Account',
            title: 'Account',
            type: 'item',
            url: '/dashboard/account',
            icon: icons.UserAddOutlined,
            breadcrumbs: false
            // target: true
        }
    ]
};

export default pages;
