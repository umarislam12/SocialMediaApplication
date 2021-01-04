import { AlertifyService } from "./../../_services/alertify.service";
import { AdminService } from "./../../_services/admin.service";
import { User } from "./../../_models/User";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-photo-managemnt",
  templateUrl: "./photo-managemnt.component.html",
  styleUrls: ["./photo-managemnt.component.scss"],
})
export class PhotoManagemntComponent implements OnInit {
  users: User[];
  returnValue: any;
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getUnapprovedPhotos();
    // this.route.data.subscribe((data) => {
    //   console.log(data);
    //   this.users = data["roles"].result;
    // });
  }
  getUnapprovedPhotos() {
    this.adminService.getPhotosForApproval().subscribe(
      (users: User[]) => {
        this.users = users;
        console.log(this.users);
      },
      (error) => {
        this.alertify.error("error");
      }
    );
  }
}
