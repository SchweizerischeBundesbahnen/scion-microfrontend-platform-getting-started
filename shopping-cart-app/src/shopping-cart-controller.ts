import { mapToBody, MessageClient, MicrofrontendPlatform, OutletRouter } from '@scion/microfrontend-platform';
import { Beans } from '@scion/toolkit/bean-manager';
import { take } from 'rxjs/operators';
import { Item } from './item.model';
import { mapArray } from '@scion/toolkit/operators';
import { WebStorage } from '@scion/toolkit/storage';

const STORAGE = new WebStorage(window.sessionStorage);

/**
 * Microfrontend to display the shopping cart.
 */
class ShoppingCartController {

  constructor() {
    document.querySelector('button.checkout').addEventListener('click', () => this.onCheckoutClick());
  }

  public async init(): Promise<void> {
    // Connect to the platform host
    await MicrofrontendPlatform.connectToHost({symbolicName: 'shopping-cart-app'});

    this.renderShoppingCart();
  }

  /**
   * Renders items in the shopping cart.
   */
  private renderShoppingCart(): void {
    STORAGE.observe$<Item[]>('items').subscribe(items => {
      const ul = document.querySelector('ul.cart');
      ul.innerHTML = '';

      items.forEach(item => {
        const li = document.createElement('li');
        const text = document.createTextNode(item.name);
        const button = document.createElement('button');

        button.innerText = 'Remove';
        button.addEventListener('click', () => this.onRemoveItemClick(item));

        ul.appendChild(li);
        li.appendChild(text);
        li.appendChild(button);
      });
    });
  }

  private async onCheckoutClick(): Promise<void> {
    const itemIds = await STORAGE.observe$<Item[]>('items')
      .pipe(
        take(1),
        mapArray(item => item.productId),
      )
      .toPromise();

    // Start the checkout process
    Beans.get(MessageClient).publish('checkout', itemIds);

    // Hide the shopping cart panel
    Beans.get(OutletRouter).navigate(null, {outlet: 'SHOPPING-CART'});
  }

  private onRemoveItemClick(item: Item): void {
    Beans.get(MessageClient).publish('shopping-cart/remove', item.id);
  }
}

new ShoppingCartController().init();
