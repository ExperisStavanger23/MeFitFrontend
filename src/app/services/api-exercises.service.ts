import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { Exercise } from "src/types"
import { catchError, map } from "rxjs/operators"

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

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrlBase}/Exercise`)
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrlBase}/Exercise/${id}`)
  }
}
