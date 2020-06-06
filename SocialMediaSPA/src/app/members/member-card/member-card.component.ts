import { AlertifyService } from "./../../_services/alertify.service";
import { UserService } from "./../../_services/user.service";
import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/_models/User";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-member-card",
  templateUrl: "./member-card.component.html",
  styleUrls: ["./member-card.component.css"],
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}
  sendLike(id: number) {
    this.userService
      .sendLike(this.authService.decodedToken.nameid, id)
      .subscribe(
        (data) => {
          this.alertify.success("you have liked" + this.user.knownAs);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
