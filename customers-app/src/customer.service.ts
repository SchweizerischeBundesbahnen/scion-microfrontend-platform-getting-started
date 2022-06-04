import customers from './customer.data.json';

export class CustomerService {

  public static INSTANCE = new CustomerService();

  private customers: Customer[] = customers.map(customer => ({...customer, productIds: randomProductIds()}));

  public getCustomer(id: string): Customer | undefined {
    return this.customers.find(customer => customer.id === id);
  }

  public getCustomers(): Customer[] {
    return this.customers;
  }
}

function randomProductIds(): string[] {
  return new Array<string>(Math.ceil(Math.random() * 10))
    .fill(null)
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
  productIds: string[]
}
