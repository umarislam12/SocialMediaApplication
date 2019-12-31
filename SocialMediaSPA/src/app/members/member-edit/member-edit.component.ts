import { AlertifyService } from "./../../_services/alertify.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
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
  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => (this.user = data["user"]));
  }
  updateUser() {
    console.log(this.user);
    this.alertify.success("user has been updated successfully");
    this.editForm.reset(this.user);
  }
}
