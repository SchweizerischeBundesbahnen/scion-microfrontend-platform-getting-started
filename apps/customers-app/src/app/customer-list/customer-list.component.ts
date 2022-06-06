import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Customer, CustomerService} from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CustomerListComponent {

  public customers: Customer[];

  constructor(customerService: CustomerService, private router: Router) {
    this.customers = customerService.getCustomers();
  }

  public onOpenCustomer(id: string): void {
    this.router.navigate([`/customers/${id}`]);
  }
}
