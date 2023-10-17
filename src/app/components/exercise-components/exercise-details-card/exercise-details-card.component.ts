import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { ApiExercisesService } from "src/app/services/api-exercises.service"
import { Exercise, MuscleGroup } from "src/interfaces"

@Component({
  selector: "app-exercise-details-card",
  templateUrl: "./exercise-details-card.component.html",
  styleUrls: ["./exercise-details-card.component.css"],
})
export class ExerciseDetailsCardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiExercisesService: ApiExercisesService
  ) {}

  id!: number
  exercise: Exercise = {
    id: 0,
    name: "",
    description: "",
    image: "",
    video: "",
    muscleGroups: [],
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]

    this.apiExercisesService
      .getExerciseById(this.id)
      .subscribe((exercise: any) => {
        const muscleGroups: MuscleGroup[] = []
        exercise.exerciseMuscleGroups.forEach((element: any) => {
          muscleGroups.push(element.muscleGroup)
        })
        this.exercise = {
          id: exercise.id,
          name: exercise.name,
          description: exercise.description,
          image: exercise.image,
          video: exercise.video,
          muscleGroups: muscleGroups,
        }
      })
  }
}
