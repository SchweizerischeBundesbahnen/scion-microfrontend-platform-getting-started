import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'customers', children: [
      {path: '', loadComponent: () => import('./customer-list/customer-list.component').then(mod => mod.CustomerListComponent)},
      {path: ':id', loadComponent: () => import('./customer/customer.component').then(mod => mod.CustomerComponent)},
    ],
  },
  {path: '', redirectTo: 'customers', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
