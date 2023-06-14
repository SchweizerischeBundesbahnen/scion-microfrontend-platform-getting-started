import {APP_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders, NgZone} from '@angular/core';
import {MicrofrontendPlatformClient, ObservableDecorator, OutletRouter} from '@scion/microfrontend-platform';
import {Beans} from '@scion/toolkit/bean-manager';
import {NgZoneObservableDecorator} from './ng-zone-observable-decorator';

/**
 * Registers a set of DI providers to set up SCION Microfrontend Platform Client.
 */
export function provideMicrofrontendPlatformClient(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: providePlatformConnectFn,
      multi: true,
    },
    {provide: OutletRouter, useFactory: () => Beans.opt(OutletRouter)},
  ]);
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
