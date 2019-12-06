import { AuthService } from "./../../../_services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) {}
  login() {
    this.authService.login(this.model).subscribe(
      next => {
        console.log("successfully logged in");
      },
      error => {
        console.log(error);
      }
    );
  }
  ngOnInit() {}
}
