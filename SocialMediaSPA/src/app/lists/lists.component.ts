import { Pagination, PaginatedResult } from "./../_models/Pagination";
import { AlertifyService } from "./../_services/alertify.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "./../_services/user.service";
import { Component, OnInit } from "@angular/core";
import { User } from "../_models/User";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.css"],
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.users = data["users"].result;
      this.pagination = data["users"].pagination;
    });
    this.likesParam = "Likers";
  }
  loadUsers() {
    this.userService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        null,
        this.likesParam
      )
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
          console.log(this.pagination);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
  pageChanged(event: any): void {
    // debugger;
    this.pagination.currentPage = event.page;
    this.loadUsers();
    console.log(this.pagination.currentPage);
  }
}
