import {ProductService} from '../product.service';
import {QueryParams} from '../query-params';

class ProductController {

  public async init(): Promise<void> {
    QueryParams.observe$.subscribe(queryParams => this.render(queryParams.get('id')));
  }

  public render(productId: string): void {
    const productSection = document.querySelector('section#product');
    const product = ProductService.INSTANCE.getProduct(productId);

    productSection.innerHTML = null;

    // Name
    productSection.appendChild(document.createElement('label')).innerText = 'Name:';
    productSection.appendChild(document.createTextNode(product.name));

    // Price
    productSection.appendChild(document.createElement('label')).innerText = 'Price:';
    productSection.appendChild(document.createTextNode(`$ ${product.price.toFixed(2)}`));
  }
}

new ProductController().init();
