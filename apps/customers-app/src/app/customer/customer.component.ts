import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';
import {Customer, CustomerService} from '../customer.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CustomerComponent {

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
