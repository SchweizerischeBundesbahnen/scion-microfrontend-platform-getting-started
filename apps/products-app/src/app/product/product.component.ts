import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductService} from '../product.service';
import {map} from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ProductComponent {

  public product: Product;

  constructor(route: ActivatedRoute, productService: ProductService) {
    route.paramMap
      .pipe(
        map(params => params.get('id')),
        map(id => productService.getProduct(id)),
      )
      .subscribe((product: Product) => {
        this.product = product;
      });
  }
}
