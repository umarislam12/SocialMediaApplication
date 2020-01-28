import { AuthService } from "./../../_services/auth.service";
import { UserService } from "./../../_services/user.service";
import { AlertifyService } from "./../../_services/alertify.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { User } from "src/app/_models/User";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"]
})
export class MemberEditComponent implements OnInit {
  //to get the access of all the form methods
  @ViewChild("editForm", { static: true }) editForm: NgForm;
  user: User;
  photoUrl:string;
  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userservice: UserService,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => (this.user = data["user"]));
    this.authservice.currentPhotoUrl.subscribe(photoUrl=>this.photoUrl=photoUrl);
  }
  updateUser() {
    this.userservice
      .updateUser(this.authservice.decodedToken.nameid, this.user)
      .subscribe(
        next => {
          console.log(this.user);
          this.alertify.success("user has been updated successfully");
          this.editForm.reset(this.user);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
  //setting photoUrl coming from child component to the component property
  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
