// assets
import { IconDashboard, IconHome, IconTool } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconTool, IconHome };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: '',
            title: 'Dashboard',
            type: 'item',
            url: '',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'rooms',
            title: 'Rooms',
            type: 'item',
            url: '/rooms',
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            id: 'importance-preferences',
            title: 'Importance Preferences',
            type: 'item',
            url: '/importance-preferences',
            icon: icons.IconTool,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
