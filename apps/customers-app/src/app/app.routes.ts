import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'customers', children: [
      {path: '', loadComponent: () => import('./customer-list/customer-list.component')},
      {path: ':id', loadComponent: () => import('./customer/customer.component')},
    ],
  },
  {path: '', redirectTo: 'customers', pathMatch: 'full'},
];
