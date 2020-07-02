import { AuthService } from './../_services/auth.service';
import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { AlertifyService } from "./../_services/alertify.service";
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Message } from "../_models/Message";
@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  /**
   *
   */
  pageNumber = 1;
  pageSize = 5;
  messageContainer = "Unread";
  constructor(
   private authservice:AuthService,
    private userservice: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  //When we use resolve, it automatically subscribes to the method
  //We do need to catch errors
  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userservice.getMessages(this.authservice.decodedToken.nameid ,this.pageNumber, this.pageSize, this.messageContainer).pipe(
      catchError((error) => {
        this.alertify.error("error getting messages");
        this.router.navigate(["/home"]);
        return of(null);
      })
    );
  }
}
