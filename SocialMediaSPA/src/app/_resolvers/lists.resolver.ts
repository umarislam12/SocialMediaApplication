import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { AlertifyService } from "./../_services/alertify.service";
import { User } from "src/app/_models/User";
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
@Injectable()
export class ListsResolver implements Resolve<User[]> {
  /**
   *
   */
  pageNumber = 1;
  pageSize = 5;
  likesParam = "Likers";
  constructor(
    private userservice: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  //When we use resolve, it automatically subscribes to the method
  //We do need to catch errors
  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userservice
      .getUsers(this.pageNumber, this.pageSize, null, this.likesParam)
      .pipe(
        catchError((error) => {
          this.alertify.error("error getting data");
          this.router.navigate(["/home"]);
          return of(null);
        })
      );
  }
}
