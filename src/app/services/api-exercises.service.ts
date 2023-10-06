import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Exercise } from "src/types"

@Injectable({
  providedIn: "root",
})
export class ApiExercisesService {
  apiUrlBase = "http://localhost:5212/api/v1"

  constructor(private http: HttpClient) {}

  postExercise(exercise: Exercise): void {
    const body = JSON.stringify(exercise)

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    })

    this.http
      .post<Exercise>(`${this.apiUrlBase}/Exercise`, body, {
        headers,
      })
      .subscribe()
  }

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrlBase}/Exercise`)
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrlBase}/Exercise/${id}`)
  }
}
