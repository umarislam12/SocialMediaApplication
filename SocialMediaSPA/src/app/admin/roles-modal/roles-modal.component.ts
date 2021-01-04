import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { User } from "src/app/_models/User";

@Component({
  selector: "app-roles-modal",
  templateUrl: "./roles-modal.component.html",
  styleUrls: ["./roles-modal.component.scss"],
})
export class RolesModalComponent implements OnInit {
  @Output() updateSelectedRoles = new EventEmitter();
  user: User;
  roles: any[];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}
  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    console.log("in roles component");
    this.bsModalRef.hide();
  }
}
