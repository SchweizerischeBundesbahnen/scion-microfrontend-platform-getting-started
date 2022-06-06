import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {MicrofrontendPlatform, OutletRouter} from '@scion/microfrontend-platform';
import {Beans} from '@scion/toolkit/bean-manager';
import {RouterModule} from '@angular/router';

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
      useValue: () => MicrofrontendPlatform.startHost({
        applications: [
          {symbolicName: 'products-app', manifestUrl: 'http://localhost:4201/assets/manifest.json'},
          {symbolicName: 'customers-app', manifestUrl: 'http://localhost:4202/assets/manifest.json'},
        ],
      }),
      multi: true,
    },
    {provide: OutletRouter, useFactory: () => Beans.get(OutletRouter)},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
