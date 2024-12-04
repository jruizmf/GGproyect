import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'Products',
        canActivate: [AuthGuard], 
        loadChildren: () =>
          import('./pages/products/products.routes').then(
            (m) => m.ProductsRoutes
          ),
      },
      {
        path: 'Orders',
        canActivate: [AuthGuard], 
        loadChildren: () =>
          import('./pages/orders/orders.routes').then(
            (m) => m.OrdersRoutes
          ),
      },
      {
        path: 'Users',
        canActivate: [AuthGuard, roleGuard], 
        loadChildren: () =>
          import('./pages/users/users.routes').then(
            (m) => m.UsersRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
