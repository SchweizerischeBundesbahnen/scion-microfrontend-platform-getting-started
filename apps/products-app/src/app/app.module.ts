import {APP_INITIALIZER, inject, NgModule, NgZone} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MicrofrontendPlatformClient, ObservableDecorator, OutletRouter} from '@scion/microfrontend-platform';
import {Beans} from '@scion/toolkit/bean-manager';
import {NgZoneObservableDecorator} from './ng-zone-observable-decorator';

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
      useFactory: providePlatformConnectFn,
      multi: true,
    },
    {provide: OutletRouter, useFactory: () => Beans.opt(OutletRouter)},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

function providePlatformConnectFn(): () => Promise<void> {
  if (window === window.top) {
    return () => Promise.resolve();
  }

  const zone = inject(NgZone);
  return (): Promise<void> => {
    Beans.register(ObservableDecorator, {useValue: new NgZoneObservableDecorator(zone)});
    return zone.runOutsideAngular(() => MicrofrontendPlatformClient.connect('products-app'));
  };
}
