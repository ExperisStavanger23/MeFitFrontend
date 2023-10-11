import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { PostWorkout, Workout } from "src/interfaces"
import { catchError, map } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class ApiWorkoutService {
  apiUrlBase = "http://localhost:5212/api/v1"
  constructor(private http: HttpClient) {}

  getAllWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiUrlBase}/Workout`)
  }

  getWorkoutById(id: number): Observable<Workout> {
    return this.http.get<Workout>(`${this.apiUrlBase}/Workout/${id}`)
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
          console.log("Response:", response)

          const success = Object.prototype.hasOwnProperty.call(response, "id")

          return success
        }),
        catchError((error: any) => {
          console.error("Error:", error)
          return of(false)
        })
      )
  }
}
