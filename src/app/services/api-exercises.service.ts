import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { Exercise } from "src/interfaces"
import { catchError, map } from "rxjs/operators"
import { MuscleGroup } from "src/interfaces"

@Injectable({
  providedIn: "root",
})
/**
 * Class responsible for managing exercise-related API interactions.
 */
export class ApiExercisesService {
  apiUrlBase = "http://localhost:5212/api/v1"

  constructor(private http: HttpClient) {}

  /**
   * Create a new exercise.
   * @param exercise - The exercise to be created.
   * @returns A boolean indicating whether the exercise was successfully created.
   */
  postExercise(exercise: Exercise): Observable<boolean> {
    const body = JSON.stringify(exercise)

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    })

    return this.http
      .post<Exercise>(`${this.apiUrlBase}/Exercise`, body, {
        headers,
      })
      .pipe(
        map((response: Exercise) => {
          const success = Object.prototype.hasOwnProperty.call(response, "id")

          return success
        }),
        catchError((error: any) => {
          console.error("Error:", error)
          return of(false)
        })
      )
  }

  /**
   * Gets all the exercises.
   * @returns An observable of all exercises.
   */
  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrlBase}/Exercise`)
  }

  /**
   * Gets an exercise by its id.
   * @param id - The id of the exercise to get.
   * @returns An observable of the exercise.
   */
  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrlBase}/Exercise/${id}`)
  }

  /**
   * Gets all the muscle groups.
   * @returns An observable of all muscle groups.
   */
  getMuscleGroups(): Observable<MuscleGroup[]> {
    return this.http.get<MuscleGroup[]>(`${this.apiUrlBase}/Musclegroup`)
  }
}
