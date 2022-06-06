import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'products', children: [
      {path: '', loadComponent: () => import('./product-list/product-list.component').then(mod => mod.ProductListComponent)},
      {path: ':id', loadComponent: () => import('./product/product.component').then(mod => mod.ProductComponent)},
    ],
  },
  {path: '', redirectTo: 'products', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
