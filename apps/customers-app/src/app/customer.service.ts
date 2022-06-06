import customers from './customer.data.json';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CustomerService {

  private readonly customers: Customer[];

  constructor() {
    this.customers = customers.map(customer => ({...customer, productIds: randomProductIds()}));
  }

  public getCustomer(id: string): Customer | undefined {
    return this.customers.find(customer => customer.id === id);
  }

  public getCustomers(): Customer[] {
    return this.customers;
  }
}

function randomProductIds(): string[] {
  return new Array<string>(Math.ceil(Math.random() * 10))
    .fill('')
    .map(() => `${Math.floor(Math.random() * 20) + 1}`);
}

export interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  productIds: string[];
}
