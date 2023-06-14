import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';
import {Customer, CustomerService} from '../customer.service';
import {OutletRouter} from '@scion/microfrontend-platform';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class CustomerComponent {

  public customer: Customer;

  constructor(route: ActivatedRoute, customerService: CustomerService, router: OutletRouter) {
    route.paramMap
      .pipe(
        map(params => params.get('id')),
        map(id => customerService.getCustomer(id)),
      )
      .subscribe((customer: Customer) => {
        this.customer = customer;
        router.navigate({entity: 'products'}, {
          outlet: 'customer-products',
          params: new Map().set('ids', customer.productIds),
        });
      });
  }
}
