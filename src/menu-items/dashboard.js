// assets
import { IconDashboard, IconTool } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconTool };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
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
