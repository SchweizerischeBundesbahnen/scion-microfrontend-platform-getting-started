import {ManifestService, MicrofrontendPlatformHost, OutletRouter} from '@scion/microfrontend-platform';
import {Beans} from '@scion/toolkit/bean-manager';
import {filterArray} from '@scion/toolkit/operators';

class HostController {

  public async init(): Promise<void> {
    await MicrofrontendPlatformHost.start({
      applications: [
        {symbolicName: 'products-app', manifestUrl: `${process.env.PRODUCTS_APP_URL}/manifest.json`},
        {symbolicName: 'customers-app', manifestUrl: `${process.env.CUSTOMERS_APP_URL}/manifest.json`},
        {
          symbolicName: 'devtools',
          manifestUrl: `${process.env.DEV_TOOLS_URL}/assets/manifest.json`,
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
    });

    // Display the DevTools
    Beans.get(OutletRouter).navigate({component: 'devtools', vendor: 'scion'}, {outlet: 'bottom'});

    // Create a navigation button for each of the microfrontend capabilities to be added to the navigation bar
    const navbar = document.querySelector('nav');
    Beans.get(ManifestService).lookupCapabilities$({type: 'microfrontend'})
      .pipe(filterArray(capability => capability.properties.navbar))
      .subscribe(capabilities => {
        navbar.innerHTML = null;
        capabilities.forEach(capability => {
          const menuItem = navbar.appendChild(document.createElement('button'));
          menuItem.innerText = capability.properties.navbar.label;
          menuItem.addEventListener('click', () => {
            Beans.get(OutletRouter).navigate(capability.qualifier);
          });
        })
      });
  }
}

new HostController().init();
