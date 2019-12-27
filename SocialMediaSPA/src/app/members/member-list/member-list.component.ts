import { ActivatedRoute } from "@angular/router";
import { AlertifyService } from "../../_services/alertify.service";
import { UserService } from "../../_services/user.service";
import { Component, OnInit } from "@angular/core";
import { User } from "../../_models/User";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(
    private userService: UserService,
    private alrtify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //this.loadUsers()
    this.route.data.subscribe(data => {
      this.users = data["users"];
    });
   
  }
  // loadUsers() {
  //   this.userService.getUsers().subscribe(
  //     (users: User[]) => {
  //       this.users = users;
  //     },
  //     error => {
  //       this.alrtify.error(error);
  //     }
  //   );
  // }
}
