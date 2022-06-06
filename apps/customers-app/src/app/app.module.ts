import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MicrofrontendPlatform, OutletRouter} from '@scion/microfrontend-platform';
import {Beans} from '@scion/toolkit/bean-manager';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useValue: () => window !== window.top ? MicrofrontendPlatform.connectToHost('customers-app') : null,
      multi: true,
    },
    {provide: OutletRouter, useFactory: () => Beans.opt(OutletRouter)},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
