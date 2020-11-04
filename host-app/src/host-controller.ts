import { ApplicationConfig, MessageClient, MicrofrontendPlatform, OutletRouter } from '@scion/microfrontend-platform';
import { Beans } from '@scion/toolkit/bean-manager';

class HostController {

  private platformConfig: ApplicationConfig[] = [
    {symbolicName: 'host-app', manifestUrl: '/manifest.json'},
    {symbolicName: 'products-app', manifestUrl: `${process.env.PRODUCTS_APP_URL}/manifest.json`},
    {symbolicName: 'shopping-cart-app', manifestUrl: `${process.env.SHOPPING_CART_APP_URL}/manifest.json`},
  ];

  constructor() {
    document.querySelector('button.shopping-cart').addEventListener('click', () => this.onToggleShoppingCart());
  }

  public async init(): Promise<void> {
    // Start the platform
    await MicrofrontendPlatform.startHost(this.platformConfig, {symbolicName: 'host-app'});

    // Display the products microfrontend in the primary router outlet
    Beans.get(OutletRouter).navigate(`${process.env.PRODUCTS_APP_URL}/products.html`);
  }

  private onToggleShoppingCart(): void {
    // Publish message to toggle the shopping cart panel when the user clicks the shopping cart button
    Beans.get(MessageClient).publish('shopping-cart/toggle-side-panel');
  }
}

new HostController().init();
