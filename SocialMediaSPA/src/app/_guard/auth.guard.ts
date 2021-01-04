import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}
  canActivate(next: ActivatedRouteSnapshot): boolean {
    //bcz authguard is protecting child route so firstChild is used
    const roles = next.firstChild.data["roles"] as Array<string>;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      console.log(match);
      if (match) {
        return true;
      } else {
        this.router.navigate(["members"]);
        this.alertify.error("you are not authorised to acces this area");
      }
    }
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error("you shall not pass without check!!");
    this.router.navigate(["/home"]);
    return false;
  }
}
