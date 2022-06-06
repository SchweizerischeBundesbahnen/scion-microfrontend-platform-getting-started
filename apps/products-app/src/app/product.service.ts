import products from './product.data.json';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProductService {

  public getProduct(id: string): Product | undefined {
    return products.find(product => product.id === id);
  }

  public getProducts(filter?: { ids?: string[] }): Product[] {
    if (filter?.ids) {
      return products.filter(product => filter.ids!.includes(product.id));
    }
    return products;
  }
}

export interface Product {
  id: string;
  name: string;
  price: number;
}
