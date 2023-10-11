import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { PostUser, User } from "src/interfaces"
import { KeycloakService } from "keycloak-angular"
import { BehaviorSubject, Observable } from "rxjs"
// import jwt_decode from "jwt-decode"

@Injectable({
  providedIn: "root",
})
export class UserApiService {
  apiUrlBase = "http://localhost:5212/api/v1"
  user = new BehaviorSubject<User>({})

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService
  ) {}

  async postUser(userToPost: PostUser): Promise<void> {
    const body = JSON.stringify(userToPost)
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    })

    this.http
      .post<PostUser>(`${this.apiUrlBase}/User`, body, {
        headers,
      })
      .subscribe()
  }

  getUser(id: string): Observable<User> {
    this.http.get<User>(`${this.apiUrlBase}/User/${id}`).subscribe(user => {
      this.user.next(user)
    })
    return this.user.asObservable()
  }

  updateUser(user: User): void {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    })

    const body = JSON.stringify(user)
    console.log("in user update service")
    console.log(body)
    this.http
      .put(`${this.apiUrlBase}/User/${user.id}`, body, { headers })
      .subscribe()
    this.user.next(user)
  }
}
