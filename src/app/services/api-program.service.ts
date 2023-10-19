import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, catchError, map, of } from "rxjs"
import { PostProgram, Program } from "src/interfaces"

@Injectable({
  providedIn: "root",
})
export class ApiProgramService {
  apiUrlBase = import.meta.env["NG_APP_API_URL"]
  constructor(private http: HttpClient) {}

  getAllPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.apiUrlBase}/Program`)
  }

  getProgramById(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.apiUrlBase}/Program/${id}`)
  }

  postProgram(program: PostProgram): Observable<boolean> {
    const body = JSON.stringify(program)

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    })

    return this.http
      .post<Program>(`${this.apiUrlBase}/Program`, body, {
        headers,
      })
      .pipe(
        map((response: Program) => {
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
