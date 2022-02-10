import { MessageClient, MicrofrontendPlatform } from '@scion/microfrontend-platform';
import { Beans } from '@scion/toolkit/bean-manager';

class ProductsController {

  private products: Product[] = [
    {id: 1, name: 'Fancy Shoes'},
    {id: 2, name: 'Shiny knick-knack'},
    {id: 3, name: 'Fascinating book'},
    {id: 4, name: 'Exciting gadget'},
    {id: 5, name: 'Bells and whistles'},
  ];

  public async init(): Promise<void> {
    // Connect to the platform host
    await MicrofrontendPlatform.connectToHost('products-app');

    // Render the products
    this.products.forEach(product => this.renderProduct(product));
  }

  private onAddToCart(product: Product): void {
    // Notify the shopping cart application when the user adds a product to the shopping cart
    Beans.get(MessageClient).publish('shopping-cart/add-product', product);
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
}

new ProductsController().init();

interface Product {
  id: number;
  name: string;
}
