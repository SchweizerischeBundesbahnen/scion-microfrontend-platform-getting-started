import {ApplicationConfig} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';
import {appRoutes} from './app.routes';
import {provideMicrofrontendPlatformClient} from './microfrontend-platform-client.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withHashLocation()),
    provideMicrofrontendPlatformClient(),
  ],
};
