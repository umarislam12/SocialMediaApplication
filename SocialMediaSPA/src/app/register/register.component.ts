import { Router } from "@angular/router";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { User } from "../_models/User";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any;
  //emit an event
  @Output() cancelRegister = new EventEmitter();
  //empty object properties are initialized by ngModel.property html template, activated on submit
  registerForm: FormGroup;
  user: User;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createRegisterForm();
    this.bsConfig = {
      containerClass: "theme-red",
    };
    //Create Form in our component
    // this.registerForm = new FormGroup(
    //   {
    //     username: new FormControl("", Validators.required),
    //     password: new FormControl("", [
    //       Validators.required,
    //       Validators.minLength(4),
    //       Validators.maxLength(8)
    //     ]),
    //     confirmPassword: new FormControl("", Validators.required)
    //   },
    //   this.passwordMatchValidator
    // );
  }
  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ["male"],
        username: ["", Validators.required],
        knownAs: ["", Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ["", Validators.required],
        country: ["", Validators.required],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ["", Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(g: FormGroup) {
    //to get the form validated and has nothing to do with what is being feedbacked to the user

    return g.get("password").value === g.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }
  // register() {
  //   console.log(this.model);
  // }
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        (next) => {
          console.log(next);
          this.alertify.success("You have registered successfully");
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(["members"]);
          });
        }
      );
    }
    // debugger;
    // this.authService.register(this.model).subscribe(
    //   () => {
    //     this.alertify.success("successful");
    //   },
    //   error => {
    //     this.alertify.error(error);
    //   }
    // );
    console.log(this.registerForm.value);
  }
  cancel() {
    //We can emit any kind of data to our parent component here

    this.cancelRegister.emit(false);
    console.log("cancelled");
  }
}
