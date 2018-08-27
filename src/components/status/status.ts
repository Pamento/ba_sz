import { Component } from "@angular/core";
import { StatusService } from "./status.service";
/**
 * Generated class for the StatusComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "status",
  templateUrl: "status.html",
  providers: [StatusService]
})
export class StatusComponent {
  constructor() {
    console.log("Hello StatusComponent");
  }
}
