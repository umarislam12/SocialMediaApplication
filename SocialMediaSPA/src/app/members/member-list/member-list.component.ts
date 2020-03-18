import { ActivatedRoute } from "@angular/router";
import { AlertifyService } from "../../_services/alertify.service";
import { UserService } from "../../_services/user.service";
import { Component, OnInit } from "@angular/core";
import { User } from "../../_models/User";
import { Pagination, PaginatedResult } from "../../_models/Pagination";
@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  constructor(
    private userService: UserService,
    private alrtify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //this.loadUsers()
    this.route.data.subscribe(data => {
      this.users = data["users"].result;
     debugger;
      this.pagination = data["users"].pagination;
       debugger;
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    debugger;
    this.loadUsers();
    console.log(this.pagination.currentPage);
  }
  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alrtify.error(error);
        }
      );
  }
}
