import { MicrofrontendPlatform, PreferredSizeService } from '@scion/microfrontend-platform';
import { Beans } from '@scion/toolkit/bean-manager';
import { products } from './product-store';

/**
 * Microfrontend to display a product.
 */
class ProductDetailController {

  public async init(): Promise<void> {
    if (window.parent !== window) {
      // Connect to the platform host
      await MicrofrontendPlatform.connectToHost({symbolicName: 'products-app'});
      // Report the preferred dimension to the outlet embedding this microfrontend
      Beans.get(PreferredSizeService).fromDimension(document.querySelector('body'));
    }

    // Read the product id from the query params
    const productId = new URL(location.href).searchParams.get('id');
    const product = products.get(productId);

    // Render the product
    document.querySelector('header').innerHTML = product.name;
    document.querySelector('span.description').innerHTML = product.description;
    document.querySelector('img').src = product.image;
  }
}

new ProductDetailController().init();
