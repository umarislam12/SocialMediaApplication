import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "./_services/auth.service";
import { User } from "./_models/User";
import { tokenGetter } from "./app.module";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Angular 8 SocialMediaSPA";
  jwtHelper = new JwtHelperService();
  /**
   *
   */
  constructor(private authService: AuthService) {}
  ngOnInit() {
    const token = localStorage.getItem("token");
    // console.log(token);
    const user: User = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (token) {
      // console.log(token);
      // const refreshToken = tokenGetter();
      // this.jwtHelper.isTokenExpired(refreshToken);
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
}
