import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

// ui
// import { AppBadgeComponent } from './badge/badge.component';
// import { AppChipsComponent } from './chips/chips.component';
// import { AppListsComponent } from './lists/lists.component';
// import { AppMenuComponent } from './menu/menu.component';
// import { AppTooltipsComponent } from './tooltips/tooltips.component';
// import { AppFormsComponent } from './forms/forms.component';
// import { AppTablesComponent } from './tables/tables.component';

export const ProductsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ProductsComponent,
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
