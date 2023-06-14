import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product, ProductService} from '../product.service';
import {map} from 'rxjs';
import {DecimalPipe, NgFor} from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [NgFor, DecimalPipe],
})
export default class ProductListComponent {

  public products: Product[];

  constructor(productService: ProductService, route: ActivatedRoute, private router: Router) {
    route.queryParamMap
      .pipe(
        map(params => params.get('ids')?.split(',')),
        map(ids => productService.getProducts({ids: ids})),
      )
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  public onOpenProduct(id: string): void {
    this.router.navigate([`/products/${id}`]);
  }
}
