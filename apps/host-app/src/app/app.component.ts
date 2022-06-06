import {Component} from '@angular/core';
import {OutletRouter} from '@scion/microfrontend-platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private router: OutletRouter) {
    this.router.navigate({component: 'devtools', vendor: 'scion'}, {outlet: 'bottom'});
  }

  public onOpenProducts(): void {
    this.router.navigate('http://localhost:4201/#/products');
  }

  public onOpenCustomers(): void {
    this.router.navigate('http://localhost:4202/#/customers');
  }
}
