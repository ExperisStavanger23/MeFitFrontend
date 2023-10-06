import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Workout } from "src/interfaces"

@Injectable({
  providedIn: "root",
})
export class ApiWorkoutService {
  apiUrlBase = "http://localhost:5212/api/v1"
  constructor(private http: HttpClient) {}

  getAllWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiUrlBase}/Workout`)
  }
}
