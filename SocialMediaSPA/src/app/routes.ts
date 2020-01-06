import { PreventUnsavedChanges } from "./_guard/prevent-unsaved-changes.guard";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MemberListResolver } from "./_resolvers/member-list.resolver";

import { AuthGuard } from "./_guard/auth.guard";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { Routes } from "@angular/router";
import { ListsComponent } from "./lists/lists.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberEditResolver } from "./_resolvers/member-edit.resolver";
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "lists", component: ListsComponent },
      {
        path: "members",
        component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: "members/:id",
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      {
        path: "member/edit",
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      {
        path: "messages",
        component: MessagesComponent
      }
    ]
  },
  //{ path: "register", component: RegisterComponent },

  { path: "**", redirectTo: "", pathMatch: "full" }
];
