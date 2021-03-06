import { RolesModalComponent } from "./admin/roles-modal/roles-modal.component";
import { AdminService } from "./_services/admin.service";
import { PhotoManagemntComponent } from "./admin/photo-managemnt/photo-managemnt.component";
import { UserManagementComponent } from "./admin/user-management/user-management.component";
import { HasRoleDirective } from "./_directives/hasRole.directive";
import { AdminPanelComponent } from "./admin/admin-panel/admin-panel.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalModule } from "ngx-bootstrap/modal";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ButtonsModule } from "ngx-bootstrap/buttons";

import { MemberMessagesComponent } from "./members/member-messages/member-messages.component";
import { ListsResolver } from "./_resolvers/lists.resolver";
import { PhotoEditorComponent } from "./members/photo-editor/photo-editor.component";
import { PreventUnsavedChanges } from "./_guard/prevent-unsaved-changes.guard";
import { UserService } from "./_services/user.service";
import { AlertifyService } from "./_services/alertify.service";
import { TimeAgoPipe } from "time-ago-pipe";

import { AuthService } from "./_services/auth.service";
import { MemberEditResolver } from "./_resolvers/member-edit.resolver";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MemberListResolver } from "./_resolvers/member-list.resolver";

import { AuthGuard } from "./_guard/auth.guard";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";

import { RouterModule } from "@angular/router";
// import {
//   BsDropdownModule,
//   TabsModule,
//   PaginationModule,
//   BsDatepickerModule,
//   ButtonsModule,
// } from "ngx-bootstrap";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { NavComponent } from "./nav/nav.component";
import { RegisterComponent } from "./register/register.component";
import { appRoutes } from "./routes";
import { errorInterceptorProvider } from "./_services/error.interceptor";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxGalleryModule } from "ngx-gallery";
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { FileUploadModule } from "ng2-file-upload";
import { MessagesResolver } from "./_resolvers/messages.resolver";

export function tokenGetter() {
  return localStorage.getItem("token");
}
export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false },
  };
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberCardComponent,
    ListsComponent,
    MemberMessagesComponent,
    MessagesComponent,
    MemberDetailComponent,

    MemberEditComponent,
    TimeAgoPipe,
    PhotoEditorComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagemntComponent,
    RolesModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/auth"],
      },
    }),
  ],
  providers: [
    errorInterceptorProvider,
    MemberDetailResolver,
    MemberEditResolver,
    AuthService,
    AlertifyService,
    PreventUnsavedChanges,
    AuthGuard,
    UserService,
    AdminService,
    ListsResolver,
    MessagesResolver,
    //Resolving error
    MemberListResolver,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
  ],
  entryComponents: [RolesModalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
