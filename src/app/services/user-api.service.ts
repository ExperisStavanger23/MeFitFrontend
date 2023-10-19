import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import {
  PostUserWorkout,
  ProgramWithDate,
  User,
  UserWorkout,
  Workout,
} from "src/interfaces"
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
import { dateFormatter } from "../app.component"

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
      .subscribe()

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
        catchError(() => {
          return of(false)
        })
      )
    )

    return userExists
  }

  async addProgram(programId: number, duration: number): Promise<void> {
    const programsToPost: ProgramWithDate[] = new Array<ProgramWithDate>(0)

    if (this._user$.value.userPrograms !== undefined) {
      for (const userProgram of this._user$.value.userPrograms) {
        const program: ProgramWithDate = {
          id: userProgram.programId,
          startDate: userProgram.startDate,
          endDate: userProgram.endDate,
        }
        programsToPost.push(program)
      }
    }

    const dateNow = new Date()
    const startDate: string = dateFormatter(dateNow)
    dateNow.setDate(dateNow.getDate() + duration)
    const endDate: string = dateFormatter(dateNow)

    const newProgram: ProgramWithDate = {
      id: programId,
      startDate,
      endDate,
    }
    programsToPost.push(newProgram)

    // Update User's programs backend
    const headers = await this.getHeader()

    const body = JSON.stringify(programsToPost)

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

  async addWorkout(workout: Workout) {
    const workoutIdList: PostUserWorkout[] = new Array<PostUserWorkout>(0)

    if (this._user$.value.userWorkouts !== undefined) {
      for (const userWorkout of this._user$.value.userWorkouts) {
        const workout: PostUserWorkout = {
          id: userWorkout.workoutId,
          doneDate: userWorkout.doneDate,
        }
        workoutIdList.push(workout)
      }
    }

    const newWorkout: PostUserWorkout = {
      id: workout.id,
      doneDate: null,
    }
    workoutIdList.push(newWorkout)

    const headers = await this.getHeader()

    const body = JSON.stringify(workoutIdList)

    this.http
      .put(
        `${this.apiUrlBase}/User/${this._user$.value.id}/userworkout`,
        body,
        { headers }
      )
      .subscribe(() => this.setUser())
  }
}
