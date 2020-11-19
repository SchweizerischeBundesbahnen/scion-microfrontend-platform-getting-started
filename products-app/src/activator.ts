import { MessageClient, MessageHeaders, MicrofrontendPlatform, OutletRouter } from '@scion/microfrontend-platform';
import { Beans } from '@scion/toolkit/bean-manager';


class Activator {

  public async init(): Promise<void> {
    // Connect to the platform host
    await MicrofrontendPlatform.connectToHost({symbolicName: 'products-app'});

    // Install message listeners to reply to requests from microfrontends
    this.installProductMicrofrontendRequest();
  }

  /**
   * Shows the product microfrontend when receiving a microfrontend request.
   */
  private installProductMicrofrontendRequest(): void {
    Beans.get(MessageClient)
      .observe$<string>('microfrontends/product/:id')
      .subscribe(request => {
        // Read the outlet in which to show the product microfrontend from the message headers
        const outlet = request.headers.get('outlet');
        // Read the product id for which to show the product microfrontend
        const productId = request.params.get('id');
        // Show the product microfrontend in the outlet
        Beans.get(OutletRouter).navigate(`/product-detail.html?id=${productId}`, {outlet})
      });
  }
}

new Activator().init();
