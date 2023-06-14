import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'products', children: [
      {path: '', loadComponent: () => import('./product-list/product-list.component')},
      {path: ':id', loadComponent: () => import('./product/product.component')},
    ],
  },
  {path: '', redirectTo: 'products', pathMatch: 'full'},
];
