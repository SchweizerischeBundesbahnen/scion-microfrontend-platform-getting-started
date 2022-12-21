import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, inject, NgModule, NgZone} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ManifestService, MicrofrontendPlatformHost, ObservableDecorator, OutletRouter} from '@scion/microfrontend-platform';
import {Beans} from '@scion/toolkit/bean-manager';
import {RouterModule} from '@angular/router';
import {environment} from '../environments/environment';
import {NgZoneObservableDecorator} from './ng-zone-observable-decorator';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: providePlatformStartupFn,
      multi: true,
    },
    {provide: OutletRouter, useFactory: () => Beans.get(OutletRouter)},
    {provide: ManifestService, useFactory: () => Beans.get(ManifestService)},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}

function providePlatformStartupFn(): () => Promise<void> {
  const zone = inject(NgZone);
  return (): Promise<void> => {
    Beans.register(ObservableDecorator, {useValue: new NgZoneObservableDecorator(zone)});
    return zone.runOutsideAngular(() => MicrofrontendPlatformHost.start({
      applications: [
        {symbolicName: 'products-app', manifestUrl: environment.PRODUCTS_APP_MANIFEST_URL},
        {symbolicName: 'customers-app', manifestUrl: environment.CUSTOMERS_APP_MANIFEST_URL},
        {
          symbolicName: 'devtools',
          manifestUrl: environment.DEV_TOOLS_MANIFEST_URL,
          intentionCheckDisabled: true,
          scopeCheckDisabled: true,
        },
      ],
      host: {
        manifest: {
          name: 'Host App',
          intentions: [
            {type: 'microfrontend', qualifier: {component: 'devtools', vendor: 'scion'}},
            {type: 'microfrontend', qualifier: {'*': '*'}},
          ],
        },
      },
    }));
  };
}
