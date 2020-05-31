import { map } from "rxjs/operators";
import { Pagination } from "./../_models/Pagination";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "../_models/User";
import { PaginatedResult } from "../_models/Pagination";
//As we have injected token info in app.module so we dont needd it here
// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: "Bearer " + localStorage.getItem("token")
//   })
// };
@Injectable({
  providedIn: "root",
})
export class UserService {
  baseURL = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getUsers(
    page?,
    itemsPerPage?,
    userParams?
  ): Observable<PaginatedResult<User[]>> {
    //As paginatedResult is a class so we need to initialize it
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    if (userParams != null) {
      params = params.append("minAge", userParams.minAge);
      params = params.append("maxAge", userParams.maxAge);
      params = params.append("gender", userParams.gender);
      params = params.append("orderBy", userParams.orderBy);
    }

    //get returns observable of type object
    return this.http
      .get<User[]>(this.baseURL + "user", {
        observe: "response",
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get("pagination") != null) {
            //convert serialized string into json object
            paginatedResult.pagination = JSON.parse(
              response.headers.get("pagination")
            );
          }
          return paginatedResult;
        })
      );
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseURL + "user/" + id);
  }
  updateUser(id: number, user: User) {
    return this.http.put(this.baseURL + "user/" + id, user);
  }
  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseURL + "api/users/" + userId + "/photos/" + id + "/setMain",
      {}
    );
  }
  deletePhoto(userId: number, id: number) {
    return this.http.delete(
      this.baseURL + "api/users/" + userId + "/photos/" + id
    );
  }
}
