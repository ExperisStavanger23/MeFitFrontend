import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { ApiExercisesService } from "src/app/services/api-exercises.service"
import { Exercise } from "src/types"

@Component({
  selector: "app-workout-details-card",
  templateUrl: "./workout-details-card.component.html",
  styleUrls: ["./workout-details-card.component.css"],
})
export class WorkoutDetailsCardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiExercisesService: ApiExercisesService
  ) {}

  id!: number
  exercise!: Exercise

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.apiExercisesService
      .getExerciseById(this.id)
      .subscribe((exercise: Exercise) => {
        console.log(exercise)

        this.exercise = {
          id: exercise.id,
          name: exercise.name,
          description: exercise.description,
          image: exercise.image,
          video: exercise.video,
        }
      })
  }
}
