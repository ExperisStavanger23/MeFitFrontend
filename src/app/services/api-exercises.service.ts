import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { Exercise } from "src/interfaces"
import { catchError, map } from "rxjs/operators"
import { MuscleGroup } from "src/interfaces"

@Injectable({
  providedIn: "root",
})
export class ApiExercisesService {
  apiUrlBase = "http://localhost:5212/api/v1"

  constructor(private http: HttpClient) {}

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
          const success = response === null

          return success
        }),
        catchError((error: any) => {
          console.error("Error:", error)
          return of(false)
        })
      )
  }

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrlBase}/Exercise`)
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrlBase}/Exercise/${id}`)
  }

  getMuscleGroups(): Observable<MuscleGroup[]> {
    return this.http.get<MuscleGroup[]>(`${this.apiUrlBase}/Musclegroup`)
  }
}
