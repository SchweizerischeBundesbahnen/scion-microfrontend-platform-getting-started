<a href="https://github.com/SchweizerischeBundesbahnen/scion-microfrontend-platform"><img src="scion-microfrontend-platform-banner.svg" height="50" alt="SCION Microfrontend Platform"></a>

## Getting Started with SCION Microfrontend Platform

Welcome to the source code repository of the SCION Microfrontend Platform [Getting Started Guide][link-microfrontend-platform:getting-started-guide].

This repository provides minimal application skeletons to easily work through the Getting Started Guide of the [SCION Microfrontend Platform][link-microfrontend-platform].

***

#### This repository has the following two branches:

- **skeleton branch**\
  This branch is the starting point for developing the webshop in the course of the Getting Started Guide.

- **master branch**\
  This branch contains the final [webshop application][link-microfrontend-platform:getting-started-app] as it will be developed in the course of the Getting Started Guide.

***

For detailed instructions on using this repository, please see the [Getting Started Guide][link-microfrontend-platform:getting-started-guide] which gives you a gentle introduction to the essentials of the [SCION Microfrontend Platform][link-microfrontend-platform].


### Applications

The webshop consists of the following three applications.

- **Host Application**\
  App which the user loads into his browser that provides the main application layout of the webshop.
- **Products Application**\
  Micro app that provides the products microfrontend, so that the user can view the products of our webshop.
- **Shopping Cart Application**\
  Micro app that provides the shopping cart microfrontend, allowing the user to add products into the shopping cart.

### Serving the webshop locally

Use the following commands to serve the webshop under http://localhost:4200.

```console
npm install
npm run start
```

### Continuous Delivery

Pushing to the master branch triggers our GitHub workflow and deploys the webshop to [Vercel](https://vercel.com/scion/scion-microfrontend-platform-getting-started-app).

 - **Host Application (main entry point of the webshop)**\
   https://scion-microfrontend-platform-getting-started.now.sh
 - **Products Application**\
   [https://scion-microfrontend-platform-getting-started-products-app.now.sh](https://scion-microfrontend-platform-getting-started-products-app.now.sh/products.html)
 - **Shopping Cart Application**\
   [https://scion-microfrontend-platform-getting-started-shopping-cart-app.now.sh](https://scion-microfrontend-platform-getting-started-shopping-cart-app.now.sh/shopping-cart.html)

***

[![Continuous Delivery][link-github-actions-workflow:status]][link-github-actions-workflow]

[link-microfrontend-platform]: https://github.com/SchweizerischeBundesbahnen/scion-microfrontend-platform
[link-microfrontend-platform:getting-started-guide]: https://github.com/SchweizerischeBundesbahnen/scion-microfrontend-platform/blob/master/docs/site/getting-started/getting-started.md
[link-microfrontend-platform:getting-started-app]: https://scion-microfrontend-platform-getting-started.now.sh
[link-github-actions-workflow]: https://github.com/SchweizerischeBundesbahnen/scion-microfrontend-platform-getting-started/actions
[link-github-actions-workflow:status]: https://github.com/SchweizerischeBundesbahnen/scion-microfrontend-platform-getting-started/workflows/Continuous%20Delivery/badge.svg?branch=master&event=push
