import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { APP_SETTINGS } from '../settings';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppLoadService {

  constructor(private httpClient: HttpClient) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
          console.log(`initializeApp:: inside promise`);

          setTimeout(() => {
            console.log(`initializeApp:: inside setTimeout`);

       
            // console.log("initializeApp: success scenario");
            resolve([]);
            
            // resolve with error object, allow init to complete and pass error state
            // console.log("initializeApp: error scenario");
            // const error = { error: "app init error", message: "Failed to load app configuration" };
            // APP_SETTINGS.initError = error;
            // resolve(error);

            // reject promise will cancel init
            // console.log("initializeApp: failure scenario");
            // reject("Error during init");
          }, 3000);
        });
  }

  getSettings(): Promise<any> {
    console.log(`getSettings:: before http.get call`);


    return new Promise((resolve, reject) => {
      this.httpClient
        // .get("http://private-1ad25-initializeng.apiary-mock.com/settings")
        .get("http://private-1ad25-initializeng.apiary-mock.com/settings/fake")
        .toPromise()
        .then((settings: any) => {
          console.log("app init success case");
          APP_SETTINGS.initialized = true;
          APP_SETTINGS.connectionString = settings[0].value;
          APP_SETTINGS.defaultImageUrl = settings[1].value;
          resolve(true);
        })
        .catch((error: any) => {
          console.log("app init fail case, but still resolve");
          APP_SETTINGS.initError = error;
          APP_SETTINGS.initialized = false;
          // catch error, but resolve promise to continue app initialize stage
          resolve(error);
        });
      
    });
    
  }
}
