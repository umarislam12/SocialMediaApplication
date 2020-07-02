import { ActivatedRoute } from "@angular/router";
import { AlertifyService } from "./../_services/alertify.service";
import { AuthService } from "./../_services/auth.service";
import { Pagination, PaginatedResult } from "./../_models/Pagination";
import { Component, OnInit } from "@angular/core";
import { Message } from "../_models/Message";
import { UserService } from "../_services/user.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = "Unread";
  constructor(
    private userService: UserService,
    private authservice: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.messages = data["messages"].result;
      this.pagination = data["messages"].pagination;
    });
  }
  loadMessages() {
    this.userService
      .getMessages(
        this.authservice.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
  deleteMessage(id: number) {
    this.alertify.confirm(
      "are you sure you want to delete this message",
      () => {
        this.userService
          .deleteMessage(id, this.authservice.decodedToken.nameid)
          .subscribe(
            () => {
              this.messages.splice(
                this.messages.findIndex((m) => m.id === id),
                1
              );
              this.alertify.success("message has been deleted successfully");
            },
            (error) => {
              this.alertify.error("failed to delete message");
            }
          );
      }
    );
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
