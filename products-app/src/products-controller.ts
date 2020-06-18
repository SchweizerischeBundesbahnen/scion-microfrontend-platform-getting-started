import { Beans, MessageClient, MicrofrontendPlatform } from '@scion/microfrontend-platform';

class ProductsController {

  private products: Product[] = [
    {id: 1, name: 'Product 1'},
    {id: 2, name: 'Product 2'},
    {id: 3, name: 'Product 3'},
    {id: 4, name: 'Product 4'},
    {id: 5, name: 'Product 5'},
  ];

  public async init(): Promise<void> {
    // Connect to the platform host
    await MicrofrontendPlatform.connectToHost({symbolicName: 'products-app'});

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
