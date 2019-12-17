import { AlertifyService } from "./../../../_services/alertify.service";
import { AuthService } from "./../../../_services/auth.service";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any;
  //emit an event
  @Output() cancelRegister = new EventEmitter();
  //empty object properties are initialized by ngModel.property html template, activated on submit
  model: any = {};
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}
  // register() {
  //   console.log(this.model);
  // }
  register() {
    // debugger;
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success("successful");
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  cancel() {
    //We can emit any kind of data to our parent component here

    this.cancelRegister.emit(false);
    console.log("cancelled");
  }
}
