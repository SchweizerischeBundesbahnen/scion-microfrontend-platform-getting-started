import {CustomerService} from '../customer.service';
import {MicrofrontendPlatformClient, OutletRouter} from '@scion/microfrontend-platform';
import {Beans} from '@scion/toolkit/bean-manager';

class CustomerListController {

  public async init(): Promise<void> {
    await MicrofrontendPlatformClient.connect('customers-app');
    this.render();
  }

  public render(): void {
    const customersSection = document.querySelector('section#customers');

    CustomerService.INSTANCE.getCustomers().forEach(customer => {
      // Customer Link
      const customerLink = customersSection.appendChild(document.createElement('a'));
      customerLink.innerText = `${customer.firstname} ${customer.lastname}`;
      customerLink.addEventListener('click', () => {
        Beans.get(OutletRouter).navigate({entity: 'customer'}, {params: new Map().set('id', customer.id)});
      });

      // City
      customersSection.appendChild(document.createTextNode(customer.city));
    });
  }
}

new CustomerListController().init();
