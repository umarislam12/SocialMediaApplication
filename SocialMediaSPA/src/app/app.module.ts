import { PhotoEditorComponent } from "./members/photo-editor/photo-editor.component";
import { PreventUnsavedChanges } from "./_guard/prevent-unsaved-changes.guard";
import { UserService } from "./_services/user.service";
import { AlertifyService } from "./_services/alertify.service";
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
  HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import {
  BsDropdownModule,
  TabsModule,
  BsDatepickerModule
} from "ngx-bootstrap";
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

export function tokenGetter() {
  return localStorage.getItem("token");
}
export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
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
    MessagesComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/auth"]
      }
    })
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
    //Resolving error
    MemberListResolver,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
