import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideMicrofrontendPlatformHost} from './microfrontend-platform-host.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideMicrofrontendPlatformHost(),
  ],
};
