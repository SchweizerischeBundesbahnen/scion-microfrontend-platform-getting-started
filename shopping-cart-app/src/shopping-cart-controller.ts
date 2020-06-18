import { MicrofrontendPlatform } from '@scion/microfrontend-platform';
import { ShoppingCartService } from './shopping-cart-service';

class ShoppingCartController {

  constructor() {
    document.querySelector('button.clear').addEventListener('click', () => this.onClear());
  }

  public async init(): Promise<void> {
    // Connect to the platform host
    await MicrofrontendPlatform.connectToHost({symbolicName: 'shopping-cart-app'});

    // Render products added to the shopping cart
    ShoppingCartService.products$.subscribe(products => {
      const cartElement = document.querySelector('ul.cart');
      cartElement.innerHTML = products
        .map(product => `<li>${product.name}</li>`)
        .join('');
    });
  }

  private onClear(): void {
    ShoppingCartService.clear();
  }
}

new ShoppingCartController().init();
