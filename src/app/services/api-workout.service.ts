/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { PostWorkout, Workout, WorkoutGet } from "src/interfaces"
import { catchError, map } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
/**
 * Class responsible for managing workout-related API interactions.
 */
export class ApiWorkoutService {
  apiUrlBase = "http://localhost:5212/api/v1"
  constructor(private http: HttpClient) {}

  /**
   * Gets all the workouts.
   * @returns An observable of all workouts.
   */
  getAllWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiUrlBase}/Workout`)
  }

  /**
   * Gets a workout by its id.
   * @param id - The id of the workout to get.
   * @returns - The workout as an observable.
   */
  getWorkoutById(id: number): Observable<WorkoutGet> {
    return this.http.get<WorkoutGet>(`${this.apiUrlBase}/Workout/${id}`)
  }

  /**
   * Create a new workout.
   * @param workout - The workout to be created.
   * @returns - A boolean indicating whether the workout was successfully created.
   */
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
