import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { OrdersComponent } from '../orders/orders.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { roleGuard } from 'src/app/guards/role.guard';

// ui
// import { AppBadgeComponent } from './badge/badge.component';
// import { AppChipsComponent } from './chips/chips.component';
// import { AppListsComponent } from './lists/lists.component';
// import { AppMenuComponent } from './menu/menu.component';
// import { AppTooltipsComponent } from './tooltips/tooltips.component';
// import { AppFormsComponent } from './forms/forms.component';
// import { AppTablesComponent } from './tables/tables.component';

export const UsersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        canActivate: [AuthGuard, roleGuard], 
        component: UsersComponent,
      },
      // {
      //   path: 'chips',
      //   component: AppChipsComponent,
      // },
      // {
      //   path: 'lists',
      //   component: AppListsComponent,
      // },
      // {
      //   path: 'menu',
      //   component: AppMenuComponent,
      // },
      // {
      //   path: 'tooltips',
      //   component: AppTooltipsComponent,
      // },
      // {
      //   path: 'forms',
      //   component: AppFormsComponent,
      // },
      // {
      //   path: 'tables',
      //   component: AppTablesComponent,
      // },
    ],
  },
];
