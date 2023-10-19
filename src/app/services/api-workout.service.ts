import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { PostWorkout, Workout, WorkoutGet } from "src/interfaces"
import { catchError, map } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class ApiWorkoutService {
  apiUrlBase = import.meta.env["NG_APP_API_URL"]
  constructor(private http: HttpClient) {}

  getAllWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiUrlBase}/Workout`)
  }

  getWorkoutById(id: number): Observable<WorkoutGet> {
    return this.http.get<WorkoutGet>(`${this.apiUrlBase}/Workout/${id}`)
  }

  postWorkout(workout: PostWorkout): Observable<boolean> {
    const body = JSON.stringify(workout)

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    })

    return this.http
      .post<Workout>(`${this.apiUrlBase}/Workout`, body, {
        headers,
      })
      .pipe(
        map((response: Workout) => {
          const success = Object.prototype.hasOwnProperty.call(response, "name")

          return success
        }),
        catchError((error: any) => {
          console.error("Error:", error)
          return of(false)
        })
      )
  }
}
