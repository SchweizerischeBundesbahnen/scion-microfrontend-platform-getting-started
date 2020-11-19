import { ApplicationConfig, MicrofrontendPlatform, OutletRouter } from '@scion/microfrontend-platform';
import { Beans } from '@scion/toolkit/bean-manager';

class HostController {

  private platformConfig: ApplicationConfig[] = [
    {symbolicName: 'host-app', manifestUrl: '/manifest.json'},
    {symbolicName: 'products-app', manifestUrl: 'http://localhost:4201/manifest.json'},
    {symbolicName: 'shopping-cart-app', manifestUrl: 'http://localhost:4202/manifest.json'},
    {symbolicName: 'checkout-app', manifestUrl: 'http://localhost:5000/assets/manifest.json'},
  ];

  constructor() {
    document.querySelector('button.products').addEventListener('click', () => this.onProductsClick());
  }

  public async init(): Promise<void> {
    // Start the platform
    await MicrofrontendPlatform.startHost(this.platformConfig, {symbolicName: 'host-app'});

    // Display the products microfrontend in the primary router outlet
    Beans.get(OutletRouter).navigate('http://localhost:4201/product-list.html');
  }

  private onProductsClick(): void {
    Beans.get(OutletRouter).navigate('http://localhost:4201/product-list.html');
  }
}

new HostController().init();
