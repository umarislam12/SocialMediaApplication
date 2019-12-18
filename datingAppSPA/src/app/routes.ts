import { AuthGuard } from "./_guard/auth.guard";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { Routes } from "@angular/router";
import { ListsComponent } from "./lists/lists.component";
import { MemberListComponent } from "./member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
    canActivate: [AuthGuard],
    children: [
      { path: "lists", component: ListsComponent },
      {
        path: "members",
        component: MemberListComponent
      },
      { path: "messages", component: MessagesComponent }
    ]
  },
  //{ path: "register", component: RegisterComponent },

  { path: "**", redirectTo: "", pathMatch: "full" }
];
