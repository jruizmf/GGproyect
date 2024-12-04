import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
    roleAllowed: true
  },
  {
    navCap: 'Modules',
  },
  {
    displayName: 'Products',
    iconName: 'list',
    bgcolor: 'accent',
    route: '/Products/list',
    roleAllowed: true
  },
  {
    displayName: 'Orders',
    iconName: 'receipt',
    bgcolor: 'warning',
    route: '/Orders/list',
    roleAllowed: true
  },
  {
    displayName: 'Users',
    iconName: 'user',
    bgcolor: 'success',
    route: '/Users/list',
    roleAllowed: localStorage.getItem('role') == 'Admin'? true : false
  }
];
