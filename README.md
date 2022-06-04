<a href="https://github.com/SchweizerischeBundesbahnen/scion-microfrontend-platform"><img src="scion-microfrontend-platform-banner.svg" height="50" alt="SCION Microfrontend Platform"></a>

## Getting Started with SCION Microfrontend Platform

Welcome to the source code repository of the SCION Microfrontend Platform [Getting Started Guide][link-microfrontend-platform:getting-started-guide].

This repository provides minimal application skeletons to easily work through the Getting Started Guide of the [SCION Microfrontend Platform][link-microfrontend-platform].

***

#### This repository has the following two branches:

- **skeleton branch**\
  This branch is the starting point for developing the [sample application][link-microfrontend-platform:getting-started-app] in the course of the Getting Started Guide.

- **master branch**\
  This branch contains the final [sample application][link-microfrontend-platform:getting-started-app] as it will be developed in the course of the Getting Started Guide.

***

For detailed instructions on using this repository, please see the [Getting Started Guide][link-microfrontend-platform:getting-started-guide] which gives you an introduction to the essentials of the [SCION Microfrontend Platform][link-microfrontend-platform].


### Applications

The sample application consists of the following three applications.

- **Host App**\
  Provides the top-level integration container for microfrontends. It is the web app which the user loads into his browser that provides the main application shell, defining areas to embed microfrontends.

- **Products App**\
  Provides the *ProductList Microfrontend* and *Product Microfrontend*, so that we can view our products.

- **Customers Apps**\
  Provides the *CustomerList Microfrontend* and *Customer Microfrontend*, so that we can view our customers. The *Customer Microfrontend* further embeds the *ProductList Microfrontend* to show the products purchased by a customer.

### Serving the webshop locally

Use the following commands to serve the webshop under http://localhost:4200.

```console
npm install
npm run start
```

### Continuous Delivery

Pushing to the master branch triggers our GitHub workflow and deploys the sample application to [Vercel](https://vercel.com/scion/scion-microfrontend-platform-getting-started-app).

 - **Host Application (main entry point of the sample application)**\
   https://scion-microfrontend-platform-getting-started.vercel.app
 - **Products Application**\
   https://scion-microfrontend-platform-getting-started-products-app.vercel.app
 - **Customers Application**\
   https://scion-microfrontend-platform-getting-started-customers-app.vercel.app

***

[![Continuous Delivery][link-github-actions-workflow:status]][link-github-actions-workflow]

[link-microfrontend-platform]: https://github.com/SchweizerischeBundesbahnen/scion-microfrontend-platform
[link-microfrontend-platform:getting-started-guide]: https://github.com/SchweizerischeBundesbahnen/scion-microfrontend-platform/blob/master/docs/site/getting-started/getting-started.md
[link-microfrontend-platform:getting-started-app]: https://scion-microfrontend-platform-getting-started.vercel.app
[link-github-actions-workflow]: https://github.com/SchweizerischeBundesbahnen/scion-microfrontend-platform-getting-started/actions
[link-github-actions-workflow:status]: https://github.com/SchweizerischeBundesbahnen/scion-microfrontend-platform-getting-started/workflows/Continuous%20Delivery/badge.svg?branch=master&event=push
