import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { Observable } from "rxjs"
import { ApiWorkoutService } from "src/app/services/api-workout.service"
import { Workout } from "src/interfaces"
@Component({
  selector: "app-workouts",
  templateUrl: "./workouts.page.html",
  styleUrls: ["./workouts.page.css"],
})
export class WorkoutsPage implements OnInit {
  constructor(
    private router: Router,
    private apiWorkoutService: ApiWorkoutService
  ) {}

  workouts$: Observable<Workout[]> = new Observable<Workout[]>()

  ngOnInit(): void {
    this.workouts$ = this.apiWorkoutService.getAllWorkouts()
  }

  setSelectedId(id: number) {
    this.router.navigate(["/workouts", id])
  }
}
