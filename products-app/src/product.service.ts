import products from './product.data.json';

export class ProductService {

  public static INSTANCE = new ProductService();

  public getProduct(id: string): Product | undefined {
    return products.find(product => product.id === id);
  }

  public getProducts(filter?: { ids?: string[] }): Product[] {
    if (filter?.ids) {
      return products.filter(product => filter.ids.includes(product.id));
    }
    return products;
  }
}

export interface Product {
  id: string;
  name: string;
  price: number;
}
