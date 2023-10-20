/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, catchError, map, of } from "rxjs"
import { PostProgram, Program } from "src/interfaces"

@Injectable({
  providedIn: "root",
})
/**
 * Class responsible for managing program-related API interactions.
 */
export class ApiProgramService {
  apiUrlBase = import.meta.env["NG_APP_API_URL"]
  constructor(private http: HttpClient) {}

  /**
   * Gets al the programs.
   * @returns An observable of all programs.
   */
  getAllPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.apiUrlBase}/Program`)
  }

  /**
   * Gets a program by its id.
   * @param id - The id of the program to get.
   * @returns An observable of the program.
   */
  getProgramById(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.apiUrlBase}/Program/${id}`)
  }

  /**
   * Create a new program.
   * @param program - The program to be created.
   * @returns - A boolean indicating whether the program was successfully created.
   */
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
