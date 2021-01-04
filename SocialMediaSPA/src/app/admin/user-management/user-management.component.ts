import { RolesModalComponent } from "./../roles-modal/roles-modal.component";
import { AlertifyService } from "./../../_services/alertify.service";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/_models/User";
import { AdminService } from "src/app/_services/admin.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit {
  users: User[];
  bsModalRef: BsModalRef;
  constructor(
    private adminService: AdminService,
    private alertifyService: AlertifyService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getUsersWithRoles();
  }
  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        this.alertifyService.error("error");
      }
    );
  }
  editRolesModal(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user),
    };
    console.log(initialState.roles);
    this.bsModalRef = this.modalService.show(RolesModalComponent, {
      initialState,
    });
    //coontent brings value from child
    this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
      // console.log("value in UM " + value) ;
      const rolesToUpdate = {
        roleNames: [
          ...values.filter((el) => el.checked === true).map((el) => el.name),
        ],
      };
      console.log(rolesToUpdate);

      if (rolesToUpdate) {
        console.log(
          " UserManagaement user: " +
            user.userName +
            " rolesToUpdate:" +
            rolesToUpdate.roleNames
        );
        this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(
          () => {
            user.roles = [...rolesToUpdate.roleNames];
          },
          (error) => {
            console.log(error);
          }
        );
      }
      console.log("testing " + user.roles);
    });
  }
  private getRolesArray(user) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: "Admin", value: "Admin" },
      { name: "Moderator", value: "Moderator" },
      { name: "Member", value: "Member" },
      { name: "VIP", value: "VIP" },
    ];
    for (let i = 0; i < availableRoles.length; i++) {
      let isMatch = false;
      for (let j = 0; j < userRoles.length; j++) {
        if (availableRoles[i].name === userRoles[j]) {
          isMatch = true;
          availableRoles[i].checked = true;
          //console.log(availableRoles);
          roles.push(availableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        availableRoles[i].checked = false;
        roles.push(availableRoles[i]);
      }
    }
    return roles;
  }
}
