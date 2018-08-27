import { Injectable } from "@angular/core";
import { Role } from "../../models/roles/role";

/*
  Generated class for the RoleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoleProvider {
  public roles: Role[] = [];
  constructor() {
    console.log("Hello RoleProvider");
  }
  setRoles(roles: Role[]) {
    console.log("setRoles", roles);
    this.roles = roles;
  }
  getRoles(): Role[] {
    return this.roles;
  }
}
