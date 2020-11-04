import { MessageClient, MicrofrontendPlatform, OutletRouter } from '@scion/microfrontend-platform';
import { Product, ShoppingCartService } from './shopping-cart-service';
import { Beans } from '@scion/toolkit/bean-manager';

class Activator {

  private panelVisible: boolean;

  public async init(): Promise<void> {
    // Connect to the platform host
    await MicrofrontendPlatform.connectToHost({symbolicName: 'shopping-cart-app'});

    // Listener to add a product to the shopping cart
    Beans.get(MessageClient)
      .observe$<Product>('shopping-cart/add-product')
      .subscribe(msg => {
        ShoppingCartService.addProduct(msg.body);
        this.setShoppingCartPanelVisibility(true);
      });

    // Listener to open or close the shopping cart panel
    Beans.get(MessageClient)
      .observe$<Product>('shopping-cart/toggle-side-panel')
      .subscribe(() => this.setShoppingCartPanelVisibility(!this.panelVisible));
  }

  public setShoppingCartPanelVisibility(visible: boolean): void {
    this.panelVisible = visible;
    if (visible) {
      Beans.get(OutletRouter).navigate(`${window.location.origin}/shopping-cart.html`, {outlet: 'SHOPPING-CART'});
    }
    else {
      Beans.get(OutletRouter).navigate(null, {outlet: 'SHOPPING-CART'});
    }
  }
}

new Activator().init();
