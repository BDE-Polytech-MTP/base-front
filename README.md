# BaseFront

This project provides a basic front-end application to interact with the [BDE back-end REST API](https://github.com/BDE-Polytech-MTP/generic-backend).
This project can and certainly should be forked by each school to add their own content and customize application's style.

## Application overview

The project is an Angular application. You can check Angular documentation on [Angular's website](https://angular.io). You can also specificly take a look at [the PWA part](https://angular.io/guide/service-worker-intro) as the application is also meant to be used as a PWA.

We currently have 2 Angular module that define components in our application :

* `app.module.ts` : This module contains all components required for a basic user
* `administration/administration.module.ts` : This module contains all components that are only needed for users who can perform administration tasks

Both have their respective routing modules :

* `app-routing.module.ts`
* `administration/administration-routing.module.ts`

## Contributing

To contribute to this project, just fork the project and clone the forked project. 

Once cloned, run `npm install` command then make any modifications you want, commit and push. Then create a [pull request](https://github.com/BDE-Polytech-MTP/generic-backend/pulls) and I'll take a look and accept it if everything's good.
