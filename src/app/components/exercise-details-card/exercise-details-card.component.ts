import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { ApiExercisesService } from "src/app/services/api-exercises.service"
import { Exercise } from "src/types"

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
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.apiExercisesService
      .getExerciseById(this.id)
      .subscribe((exercise: Exercise) => {
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

//TODO: for video url need to change to embed url
//original
//https://www.youtube.com/watch?v=rxD321l2svE
//embed
//https://www.youtube.com/embed/rxD321l2svE
