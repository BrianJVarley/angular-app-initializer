import { Component } from '@angular/core';
import { APP_SETTINGS }  from './settings/index'
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "app";
  appSettings = APP_SETTINGS;
}
