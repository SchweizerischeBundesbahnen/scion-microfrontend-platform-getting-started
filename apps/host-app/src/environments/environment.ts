// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  PRODUCTS_APP_MANIFEST_URL: 'http://localhost:4201/assets/manifest.json',
  CUSTOMERS_APP_MANIFEST_URL: 'http://localhost:4202/assets/manifest.json',
  DEV_TOOLS_MANIFEST_URL: 'https://scion-microfrontend-platform-devtools.vercel.app/assets/manifest.json',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
