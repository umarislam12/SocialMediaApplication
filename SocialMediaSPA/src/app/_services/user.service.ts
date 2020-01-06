import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "../_models/User";
//As we have injected token info in app.module so we dont needd it here
// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: "Bearer " + localStorage.getItem("token")
//   })
// };
@Injectable({
  providedIn: "root"
})
export class UserService {
  baseURL = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    //get returns observable of type object
    return this.http.get<User[]>(this.baseURL + "user");
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseURL + "user/" + id);
  }
  updateUser(id: number, user: User) {
    return this.http.put(this.baseURL + "user/" + id, user);
  }
}
