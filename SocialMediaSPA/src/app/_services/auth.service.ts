import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { User } from "../_models/User";
import { BehaviorSubject } from "rxjs";
// import { userInfo } from "os";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseURL = environment.apiUrl + "auth/";
  decodedToken: any;
  currentUser: User;
  jwtHelper = new JwtHelperService();
  //photoUrl is an observable of type behavioral subject
  photoUrl = new BehaviorSubject<string>("../../assets/user.png");
  currentPhotoUrl = this.photoUrl.asObservable();
  constructor(private http: HttpClient) {}
  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }
  login(model: any) {
    return this.http.post(this.baseURL + "login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          //user from local storage
          this.currentUser = user.user;
          console.log(this.decodedToken);
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }
  register(user: User) {
    return this.http.post(this.baseURL + "register", user);
  }
  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }
}
