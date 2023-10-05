import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { User } from "src/interfaces"

@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiUrlBase = "http://localhost:5212/api/v1"

  constructor(private http: HttpClient) {}

  postUser(user: User): void {
    const birthday = dateformater(user.birthday)
    const test = {
      ...user,
      bio: "",
      profilePicture: "",
      birthday: birthday,
    }
    const body = JSON.stringify(test)

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    })

    this.http
      .post<User>(`${this.apiUrlBase}/User`, body, {
        headers,
      })
      .subscribe()
  }
}

function dateformater(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}
