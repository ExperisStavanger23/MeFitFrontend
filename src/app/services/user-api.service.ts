import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http"
import { Injectable } from "@angular/core"
import { User, UserWorkout } from "src/interfaces"
import { KeycloakService } from "keycloak-angular"
import {
  BehaviorSubject,
  Observable,
  catchError,
  firstValueFrom,
  map,
  of,
} from "rxjs"
import { ApiProgramService } from "./api-program.service"
import { getTokenClaims } from "src/helper-functions"

@Injectable({
  providedIn: "root",
})
export class UserApiService {
  apiUrlBase = "http://localhost:5212/api/v1"

  private _user$ = new BehaviorSubject<User>({})
  private _userExists$ = new BehaviorSubject<boolean>(false)

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService,
    private apiProgramService: ApiProgramService
  ) {}

  get user$(): Observable<User> {
    return this._user$.asObservable()
  }
  get userExists$(): Observable<boolean> {
    return this._userExists$.asObservable()
  }

  async getUser(): Promise<User> {
    const userId = getTokenClaims(await this.keycloak.getToken()).sub
    const user = this.http.get<User>(`${this.apiUrlBase}/User/${userId}`)
    return firstValueFrom(user)
  }

  async postUser(userToPost: User): Promise<void> {
    const body = JSON.stringify(userToPost)
    const headers = await this.getHeader()
    this.http
      .post<User>(`${this.apiUrlBase}/User`, body, {
        headers,
      })
      .subscribe(user => {
        console.log(user)
      })

    this._user$.next(userToPost)
  }

  async setUser(): Promise<void> {
    const claims = getTokenClaims(await this.keycloak.getToken())
    const user = await firstValueFrom(
      this.http.get<User>(`${this.apiUrlBase}/User/${claims.sub}`).pipe(
        map(user => {
          this._user$.next(user)
          return user
        })
      )
    )

    this._user$.next(user)
  }

  async updateUser(user: User): Promise<void> {
    const headers = await this.getHeader()

    const body = JSON.stringify(user)
    this.http
      .put(`${this.apiUrlBase}/User/${user.id}`, body, { headers })
      .subscribe()
    this._user$.next(user)
  }

  async userExists(id: string): Promise<boolean> {
    const userExists = await firstValueFrom(
      this.http.get<User>(`${this.apiUrlBase}/User/${id}`).pipe(
        map(user => {
          this._user$.next(user)
          return true
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err)
          return of(false)
        })
      )
    )

    return userExists
  }

  async addProgram(programId: number): Promise<void> {
    const programIdArray: number[] = new Array<number>(0)

    if (this._user$.value.userPrograms !== undefined) {
      console.log("UserApiService: user programs is undefined")
      for (const userProgram of this._user$.value.userPrograms) {
        programIdArray.push(userProgram.programId)
      }
    }

    programIdArray.push(programId)

    // Update User's programs backend
    const headers = await this.getHeader()

    const body = JSON.stringify(programIdArray)

    this.http
      .put(
        `${this.apiUrlBase}/User/${this._user$.value.id}/userprogram`,
        body,
        { headers }
      )
      .subscribe(() => this.setUser())
  }

  async updateUserWorkout(userWorkout: UserWorkout) {
    const headers = await this.getHeader()

    const body = JSON.stringify(userWorkout)
    this.http
      .put(
        `${this.apiUrlBase}/User/${this._user$.value.id}/userworkout/${userWorkout.id}/workoutgoal?done=${userWorkout.doneDate}`,
        body,
        { headers }
      )
      .subscribe(() => this.setUser())
  }

  async getHeader(): Promise<HttpHeaders> {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${await this.keycloak.getToken()}`,
    })
  }
}
