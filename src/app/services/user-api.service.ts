import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { User } from "src/interfaces"
import { KeycloakService } from "keycloak-angular"
import { BehaviorSubject, Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class UserApiService {
  apiUrlBase = "http://localhost:5212/api/v1"
  private _user$ = new BehaviorSubject<User>({})
  private _userExists$ = new BehaviorSubject<boolean>(false)

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService
  ) {}

  get user$(): Observable<User> {
    return this._user$.asObservable()
  }
  get userExists$(): Observable<boolean> {
    return this._userExists$.asObservable()
  }

  postUser(userToPost: User): void {
    const body = JSON.stringify(userToPost)
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    })

    this.http
      .post<User>(`${this.apiUrlBase}/User`, body, {
        headers,
      })
      .subscribe(user => {
        console.log(user)
      })

    this._user$.next(userToPost)
  }

  setUser(id: string): void {
    this.http.get<User>(`${this.apiUrlBase}/User/${id}`).subscribe({
      next: user => {
        this._user$.next(user)
      },
    })
  }

  updateUser(user: User): void {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    })

    const body = JSON.stringify(user)
    this.http
      .put(`${this.apiUrlBase}/User/${user.id}`, body, { headers })
      .subscribe()
    this._user$.next(user)
  }

  userExists(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrlBase}/User/${id}`)
  }

  addProgram(programId: number): void {
    if (this._user$.value.userPrograms === undefined) {
      console.log("UserApiService: user programs is undefined")
      return
    }
    // TODO add userPrograms in interfacees and use that in userProgram
    console.log(`userservice add program: ${programId}`)
    console.log(this._user$.value.userPrograms)
    for (const program of this._user$.value.userPrograms) {
      console.log(program.id)
    }
  }
}
