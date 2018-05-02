# NodeJS server base (nodejs-server-base)
A base project for nodejs backend servers with API.

Note: Developmet of this is only on branch 0.X at this time.

This project is not intended for general use and is more for me to provide a base layer for rapid deployment and movement of best practices. This project will be subject to frequent changes and refactoring and will not promise to abide to backwards compatibility version rules.

Feel free to use as a base for you projects but support is not promised.
If you wish to use and do have a question please [email](mailto:inf@skinv1.co.uk) me and I will try to answer.

There are quite a few frameworks that provide a means for rapid setup of a backend or even fullstack application deployment yet the intentions of this project are to provide a very slim layer with examples of setup with minimal dependencies and opinions.

A lot of those frameworks will do the job but can tie your hands when a project may require very specific needs.

## Possible Frameworks

### Just API

#### Loopback
Loopback is a great project for rapid API deployment.
See the main [site](https://loopback.io/)
Or a [tutorial by Niharika Singh](https://medium.freecodecamp.org/build-restful-api-with-authentication-under-5-minutes-using-loopback-by-expressjs-no-programming-31231b8472ca)

// Add more frameworks

## Intentions

Provide a reusable base project for rapid deployment of nodejs backend with;

* Organised decoupled 4 layer architecture.
 1) Input Layer
 2) Application Layer
 3) Service / Domain Layer
 4) Infrastructure Layer
* Decoupled JWT Token setup with middleware contructor with options to passthrough on token fail.
* Base for login, register and refresh endpoint points
* Base for REST API with users.
* Base for GraphQL API with Users.Base
* Example of pure functional approach to immutable domain layer

## Road map

* Extract JWT token module for public use.
* Introduce optional role policy and route access validation
* Introduce Model Validation
