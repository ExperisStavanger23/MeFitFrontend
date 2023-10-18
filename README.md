# MeFitFrontend

This is the frontend for the MeFit application. It is built using Angular using Angular Material for the UI components. The application is a part of the Case project for Noroff Accelerate 2023.

## Contributors

The MeFit project have been a collaboration between the following people:

- [Anders Størksen Wiik](https://github.com/andyret26)
- [Minh Christian Tran](https://github.com/Mintra99)
- [Philip Van Ni Thangngat](https://github.com/thangfart)
- [Sjur Gustavsen](https://github.com/GustavsenSj)

## Installation

### Prerequisites

This project was generated with [Angular CLI](https://angular.io/cli) to install the project you need to have Node.js installed on your computer. You can download Node.js [here](https://nodejs.org/en/).

After installing Node.js you can install the Angular CLI by running the following command in your terminal:

```bash
npm install -g @angular/cli
```

The project also uses [Keycloak](https://www.keycloak.org/) for authentication. A guide on how to set up Keycloak can be found [here](https://www.keycloak.org/guides).

### Installing the project

After installing the Angular CLI you can clone the project to your computer by running the following command in your terminal:

```bash
git clone https://github.com/ExperisStavanger23/MeFitFrontend.git
```

After cloning the project you need to install the dependencies by running the following command in your terminal:

```bash
npm install
```

### Setting up the environment

After installing the dependencies you need to set up the environment. To do this you need to create a file called `.env` in the `root` folder of the project. The file should look like this:

```json
  #Keycloak variables
  NG_APP_keycloakUrl= "Your keycloak url"
  NG_APP_keycloakRealm= "Your keycloak realm"
  NG_APP_keycloakClientId= "Your keycloak client id"

  #API variables (if not using local host for api)
  NG_APP_API_URL= "Your api url"
```

### Running the project

At last you can run the project by running the following command in your terminal:

```bash
ng serve
```

## Dependencies

The project uses the following dependencies:

- [Angular Material](https://material.angular.io/) For UI components
- [Keycloak-angular](https://www.npmjs.com/package/keycloak-angular) For authentication and keycloak integration and management
- [ngx-env/builder](https://www.npmjs.com/package/@ngx-env/builder) For environment variables in .env file
- [ng2-charts](https://www.npmjs.com/package/ng2-charts) for displaying data charts

## Project structure

The project is structured as follows:

```
src (contains all the source code for the project )
├── app (contains all the logic for the app)
│   ├── components (contains all the components for the project)
│   │  ├── exercise-components
│   │  ├── nav-bar
│   │  ├── program-components
│   │  ├── workout-components
│   ├── guard (contains th auth guard configuration for the project)
│   ├── pages (contains all the pages for the project)
│   ├── services (contains all the services for the project)
├── assets (contains all the assets for the project. logo and theming)
.env (contains the environment variables for the project)
eslintrc.json (contains the eslint configuration for the project)
prettierrc (contains the prettier configuration for the project)
angular.json (contains the angular configuration for the project)
```

```

```
