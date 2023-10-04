import { Component } from "@angular/core"
import { Router } from "@angular/router"
@Component({
  selector: "app-workouts",
  templateUrl: "./workouts.page.html",
  styleUrls: ["./workouts.page.css"],
})
export class WorkoutsPage {
  constructor(private router: Router) {}

  ids: number[] = [1, 2, 3]

  setSelectedId(id: number) {
    this.router.navigate(["/workouts", id])
  }
}
