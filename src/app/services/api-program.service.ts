import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Program } from "src/interfaces"

@Injectable({
  providedIn: "root",
})
export class ApiProgramService {
  apiUrlBase = "http://localhost:5212/api/v1"
  constructor(private http: HttpClient) {}

  getAllPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.apiUrlBase}/Program`)
  }

  getProgramById(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.apiUrlBase}/Program/${id}`)
  }
}
