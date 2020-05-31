import { ActivatedRoute } from "@angular/router";
import { AlertifyService } from "../../_services/alertify.service";
import { UserService } from "../../_services/user.service";
import { Component, OnInit } from "@angular/core";
import { User } from "../../_models/User";
import { Pagination, PaginatedResult } from "../../_models/Pagination";
@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem("user"));
  genderList = [
    { value: "male", display: "Males" },
    { value: "female", display: "Females" },
  ];

  userParams: any = {};
  pagination: Pagination;
  constructor(
    private userService: UserService,
    private alrtify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //this.loadUsers()
    this.route.data.subscribe((data) => {
      this.users = data["users"].result;

      this.pagination = data["users"].pagination;
    });
    this.userParams.gender = this.user.gender === "female" ? "male" : "female";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 100;
    this.userParams.orderBy = "lastActive";
  }
  pageChanged(event: any): void {
    // debugger;
    this.pagination.currentPage = event.page;
    this.loadUsers();
    console.log(this.pagination.currentPage);
  }
  resetFilters() {
    this.userParams.gender = this.user.gender === "female" ? "male" : "female";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 100;
    this.loadUsers();
  }
  loadUsers() {
    this.userService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
      )
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alrtify.error(error);
        }
      );
  }
}
