import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { Observable } from "rxjs/internal/Observable"
import { ApiExercisesService } from "src/app/services/api-exercises.service"
import { Exercise } from "src/types"

@Component({
  selector: "app-exercises",
  templateUrl: "./exercises.page.html",
  styleUrls: ["./exercises.page.css"],
})
export class ExercisesPage implements OnInit {
  constructor(
    private router: Router,
    private apiExercisesService: ApiExercisesService
  ) {}

  exercises$: Observable<Exercise[]> = new Observable<Exercise[]>()

  ngOnInit(): void {
    this.exercises$ = this.apiExercisesService.getAllExercises()
  }

  setSelectedId(id: number) {
    this.router.navigate(["/exercises", id])
  }
}
