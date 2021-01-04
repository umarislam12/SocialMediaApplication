import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../_models/User";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getUsersWithRoles() {
    return this.http.get(this.baseUrl + "admin/usersWithRoles");
  }
  updateUserRoles(user: User, roles: {}) {
    console.log(
      "users in admin service: " +
        user.userName +
        " roles in adminservice: " +
        roles
    );
    return this.http.post(
      this.baseUrl + "admin/editRoles/" + user.userName,
      roles
    );
  }
  getPhotosForApproval() {
    return this.http.get(this.baseUrl + "admin/photosForModeration");
  }
}
