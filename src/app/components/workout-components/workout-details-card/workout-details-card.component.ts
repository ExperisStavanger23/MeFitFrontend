import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { ApiWorkoutService } from "src/app/services/api-workout.service"
import { Workout } from "src/interfaces"

@Component({
  selector: "app-workout-details-card",
  templateUrl: "./workout-details-card.component.html",
  styleUrls: ["./workout-details-card.component.css"],
})
export class WorkoutDetailsCardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiWorkoutService: ApiWorkoutService
  ) {}

  id!: number
  workout: Workout = {
    id: 0,
    name: "",
    description: "",
    category: 0,
    recommendedLevel: 0,
    duration: 0,
    image: "",
    exercises: [],
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.apiWorkoutService
      .getWorkoutById(this.id)
      .subscribe((workout: Workout) => {
        this.workout = {
          id: workout.id,
          name: workout.name,
          description: workout.description,
          image: workout.image,
          category: workout.category,
          recommendedLevel: workout.recommendedLevel,
          duration: workout.duration,
          exercises: workout.exercises,
        }
      })
    console.log(this.workout)
    //TODO: this should work, but backend fetch is not working missing DTO maps....🤷‍♂️
  }
}
