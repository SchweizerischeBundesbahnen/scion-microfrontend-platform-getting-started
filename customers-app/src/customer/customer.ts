import {CustomerService} from '../customer.service';
import {QueryParams} from '../query-params';
import {Beans} from '@scion/toolkit/bean-manager';
import {MicrofrontendPlatformClient, OutletRouter} from '@scion/microfrontend-platform';

class CustomerController {

  public async init(): Promise<void> {
    await MicrofrontendPlatformClient.connect('customers-app');
    QueryParams.observe$.subscribe(queryParams => this.render(queryParams.get('id')));
  }

  public render(customerId: string): void {
    const customerSection = document.querySelector('section#customer');
    const customer = CustomerService.INSTANCE.getCustomer(customerId);

    customerSection.innerHTML = null;

    // Firstname
    customerSection.appendChild(document.createElement('label')).innerText = 'Firstname:';
    customerSection.appendChild(document.createTextNode(customer.firstname));

    // Lastname
    customerSection.appendChild(document.createElement('label')).innerText = 'Lastname:';
    customerSection.appendChild(document.createTextNode(customer.lastname));

    // Street
    customerSection.appendChild(document.createElement('label')).innerText = 'Street:';
    customerSection.appendChild(document.createTextNode(customer.street));

    // City
    customerSection.appendChild(document.createElement('label')).innerText = 'City:';
    customerSection.appendChild(document.createTextNode(customer.city));

    // Email
    customerSection.appendChild(document.createElement('label')).innerText = 'Email:';
    customerSection.appendChild(document.createTextNode(customer.email));

    // Phone
    customerSection.appendChild(document.createElement('label')).innerText = 'Phone:';
    customerSection.appendChild(document.createTextNode(customer.phone));

    // Display the products purchased by the customer
    Beans.get(OutletRouter).navigate({entity: 'products'}, {
      params: new Map().set('ids', customer.productIds),
      outlet: 'customer-products',
    });
  }
}

new CustomerController().init();
