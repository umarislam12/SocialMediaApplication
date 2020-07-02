import { map } from "rxjs/operators";
import { Pagination } from "./../_models/Pagination";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "../_models/User";
import { PaginatedResult } from "../_models/Pagination";
import { Message } from "../_models/Message";
//import { Message } from '@angular/compiler/src/i18n/i18n_ast';
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
    userParams?,
    likesParam?
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
    if (likesParam === "Likers") {
      params = params.append("likers", "true");
    }
    if (likesParam === "Likees") {
      params = params.append("likees", "true");
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
  sendLike(id: number, recipientId: number) {
    return this.http.post(
      this.baseURL + "user/" + id + "/like/" + recipientId,
      {}
    );
  }
  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    var paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<
      Message[]
    >();
    let params = new HttpParams();
    params = params.append("MessageContainer", messageContainer);
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    return this.http
      .get<Message[]>(this.baseURL + "users/" + id + "/messages", {
        observe: "response",
        params,
      })
      .pipe(
        map((response) => {
          console.log(response);
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      );
  }
  getMessageThread(id: number, recipientId: number) {
    return this.http.get<Message[]>(
      this.baseURL + "users/" + id + "/messages/thread/" + recipientId
    );
  }
  sendMessage(id: number, message: Message) {
    return this.http.post(this.baseURL + "users/" + id + "/messages", message);
  }
  deleteMessage(id: number, userId: number) {
    return this.http.post(
      this.baseURL + "users/" + userId + "/messages/" + id,
      {}
    );
  }
  markAsRead(userId: number, messageId: number) {
    this.http
      .post(
        this.baseURL + "users/" + userId + "/messages/" + messageId + "/read",
        {}
      )
      .subscribe();
  }
}
