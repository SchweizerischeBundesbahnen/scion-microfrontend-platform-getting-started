import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';
import {Customer, CustomerService} from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  standalone: true,
})
export default class CustomerComponent {

  public customer: Customer;

  constructor(route: ActivatedRoute, customerService: CustomerService) {
    route.paramMap
      .pipe(
        map(params => params.get('id')),
        map(id => customerService.getCustomer(id)),
      )
      .subscribe((customer: Customer) => {
        this.customer = customer;
      });
  }
}
