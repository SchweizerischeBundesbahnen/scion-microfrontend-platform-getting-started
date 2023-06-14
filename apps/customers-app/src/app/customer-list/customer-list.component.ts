import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {Customer, CustomerService} from '../customer.service';
import {OutletRouter} from '@scion/microfrontend-platform';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  standalone: true,
  imports: [NgFor],
})
export default class CustomerListComponent {

  public customers: Customer[];

  constructor(customerService: CustomerService, private router: OutletRouter) {
    this.customers = customerService.getCustomers();
  }

  public onOpenCustomer(id: string): void {
    this.router.navigate({entity: 'customer'}, {
      params: new Map().set('id', id),
    });
  }
}
