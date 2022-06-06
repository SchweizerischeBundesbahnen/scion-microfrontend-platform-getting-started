import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public onOpenProducts(): void {
    this.router.navigate('http://localhost:4201/#/products');
  }

  public onOpenCustomers(): void {
    this.router.navigate('http://localhost:4202/#/customers');
  }
}
