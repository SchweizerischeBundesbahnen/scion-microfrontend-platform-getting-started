import { MessageClient, MicrofrontendPlatform, OutletRouter } from '@scion/microfrontend-platform';
import { Beans } from '@scion/toolkit/bean-manager';
import { Arrays } from '@scion/toolkit/util';
import { Item } from './item.model';
import { WebStorage } from '@scion/toolkit/storage';
import { UUID } from '@scion/toolkit/uuid';

const STORAGE = new WebStorage(window.sessionStorage);

class Activator {

  private items: Item[] = [];

  public async init(): Promise<void> {
    // Connect to the platform host
    await MicrofrontendPlatform.connectToHost({symbolicName: 'shopping-cart-app'});

    this.installAddToCartListener();
    this.installItemRemoveRequestHandler();
  }

  /**
   * Listens for requests to put a product into the shopping cart.
   */
  private installAddToCartListener(): void {
    Beans.get(MessageClient)
      .observe$<Item>('shopping-cart/add')
      .subscribe(request => {
        this.items.push({id: UUID.randomUUID(), productId: request.body.id, name: request.body.name});
        STORAGE.put('items', this.items);
        Beans.get(OutletRouter).navigate(`${window.location.origin}/shopping-cart.html`, {outlet: 'SHOPPING-CART'});
      });
  }

  /**
   * Listens for requests to observe items in the shopping cart.
   */
  private installItemRemoveRequestHandler(): void {
    Beans.get(MessageClient)
      .observe$<string>('shopping-cart/remove')
      .subscribe(request => {
        Arrays.remove(this.items, item => item.id == request.body);
        STORAGE.put('items', this.items);
      });
  }
}

new Activator().init();
