import {APP_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders, NgZone} from '@angular/core';
import {ManifestService, MicrofrontendPlatformHost, ObservableDecorator, OutletRouter} from '@scion/microfrontend-platform';
import {Beans} from '@scion/toolkit/bean-manager';
import {environment} from '../environments/environment';
import {NgZoneObservableDecorator} from './ng-zone-observable-decorator';

/**
 * Registers a set of DI providers to set up SCION Microfrontend Platform Host.
 */
export function provideMicrofrontendPlatformHost(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: providePlatformStartupFn,
      multi: true,
    },
    {provide: OutletRouter, useFactory: () => Beans.get(OutletRouter)},
    {provide: ManifestService, useFactory: () => Beans.get(ManifestService)},
  ])
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
