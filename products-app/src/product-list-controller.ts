import { MessageClient, MicrofrontendPlatform } from '@scion/microfrontend-platform';
import { Beans } from '@scion/toolkit/bean-manager';
import { Product, products } from './product-store';

/**
 * Microfrontend to list available products.
 */
class ProductListController {

  public async init(): Promise<void> {
    // Connect to the platform host
    if (window !== window.parent) {
      await MicrofrontendPlatform.connectToHost({symbolicName: 'products-app'});
    }

    // Render the products
    products.forEach(product => this.renderProduct(product));
  }

  private renderProduct(product: Product): void {
    const ul = document.querySelector('ul.products');
    const li = document.createElement('li');
    const text = document.createTextNode(product.name);
    const button = document.createElement('button');

    button.innerText = 'Add to cart';
    button.addEventListener('click', () => this.onAddToCart(product));

    ul.appendChild(li);
    li.appendChild(text);
    li.appendChild(button);
  }

  private onAddToCart(product: Product): void {
    // Notify the shopping cart application when the user adds a product to the shopping cart
    Beans.get(MessageClient).publish('shopping-cart/add', {id: product.id, name: product.name});
  }
}

new ProductListController().init();

