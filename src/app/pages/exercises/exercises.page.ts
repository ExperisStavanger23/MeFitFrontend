import { Component } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "app-exercises",
  templateUrl: "./exercises.page.html",
  styleUrls: ["./exercises.page.css"],
})
export class ExercisesPage {
  constructor(private router: Router) {}

  ids: number[] = [1, 2, 3, 4]

  setSelectedId(id: number) {
    this.router.navigate(["/exercises", id])
  }
}
