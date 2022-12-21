import {ProductService} from '../product.service';
import {QueryParams} from '../query-params';
import {MicrofrontendPlatformClient, OutletRouter} from '@scion/microfrontend-platform';
import {Beans} from '@scion/toolkit/bean-manager';

class ProductListController {

  public async init(): Promise<void> {
    await MicrofrontendPlatformClient.connect('products-app');
    QueryParams.observe$.subscribe(queryParams => {
      const productIds = queryParams.get('ids')?.split(',');
      this.render(productIds);
    });
  }

  public render(ids?: string[]): void {
    const productsSection = document.querySelector('section#products');
    productsSection.innerHTML = null;

    ProductService.INSTANCE.getProducts({ids}).forEach(product => {
      // Product Name
      const productLink = productsSection.appendChild(document.createElement('a'));
      productLink.innerText = product.name;
      productLink.addEventListener('click', () => {
        Beans.get(OutletRouter).navigate({entity: 'product'}, {params: new Map().set('id', product.id)});
      });

      // Product Price
      productsSection.appendChild(document.createTextNode(`$ ${product.price.toFixed(2)}`));
    });
  }
}

new ProductListController().init();
