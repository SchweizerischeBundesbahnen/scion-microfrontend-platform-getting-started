import {Component} from '@angular/core';
import {ManifestService, MicrofrontendCapability, OutletRouter, Qualifier} from '@scion/microfrontend-platform';
import {filterArray} from '@scion/toolkit/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public microfrontendCapabilities$: Observable<MicrofrontendCapability[]>;

  constructor(private router: OutletRouter, manifestService: ManifestService) {
    this.router.navigate({component: 'devtools', vendor: 'scion'}, {outlet: 'bottom'});
    this.microfrontendCapabilities$ = manifestService.lookupCapabilities$<MicrofrontendCapability>({type: 'microfrontend'})
      .pipe(filterArray(capability => capability.properties['navbar']));
  }

  public onOpenMicrofrontend(qualifier: Qualifier): void {
    this.router.navigate(qualifier);
  }
}
