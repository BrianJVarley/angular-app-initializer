# InitializeNG

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

# Initialization Pattern

1. app.module imports the `AppLoadModule` which is responsible for loading app configuration data. For example service FQDN or a settings config.

2. Once `AppLoadModule` loads, Angular checks the module's providers which contain the `APP_INITIALIZER` DI token, which in turn calls the factory methods `init_app` and `get_settings`.

3. When each factory is invoked, the particular service methods are called, e.g, `appLoadService.getSettings();`

4. Based on the promise resolving for each service call, the Angular app continues with App initialization.

5. In this implementation, we don't `reject()` the service calls if an error is thrown as this would cancel the app initialization process. Instead we can call `resolve(error)` and display an appropriate error in the app entry component template using APP_SETTINGS data. Which allows the app to finish initialization.

# NgRx Approach

> The following example shows how an app initializer function can be use with NgRx to dispatch an action, which will trigger an effect and service call. Which the initializer subscribes to the side effect state `isLoaded` or `hasInitError`.

Credit: https://gist.github.com/matheo/731603757d4781e31605c8d6a61684f3, https://github.com/mohyeid/ngrxInitializer

```JavaScript

/**
 * App Initializer with Effects
 */

providers: [
    LoaderEffect,
    {
      provide: APP_INITIALIZER, 
      useFactory: initApplication,
      multi: true,
      deps: [[new Inject(Store)]]
    }
  ],

export function initApplication(store: Store<AppState>) {
  return () =>
    new Promise(resolve => {
      const loaded$ = new Subject();
      store.dispatch(new LoadSystem());
      store
        .select((state:AppState) => state.isLoaded)
        .withLatestFrom(this.store.pipe(select(selectHasInitError))),
        .pipe(takeUntil(loaded$))
        .subscribe(([loaded, hasInitError]) => {
          if (loaded) {
            loaded$.next();
            resolve();
          } else if (hasInitError) {

            loaded$.next();
            resolve();
          }
        });
    });
}

```

_APP_INITIALIZER explanation_

> Angular suspends the app initialization until all the functions provided by the `APP_INITIALIZER` are run. If any of those intializers return a promise, then the angular waits for it to resolve, before continuing with the App initialization
> This gives us an opportunity to hook into the initialization process and run some our application custom logic. You can load runtime configuration information. load important data from the backend etc. See: https://angular.io/api/core/APP_INITIALIZER

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
