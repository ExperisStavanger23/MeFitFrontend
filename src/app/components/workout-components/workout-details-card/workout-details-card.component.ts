import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { ApiWorkoutService } from "src/app/services/api-workout.service"
import { UserApiService } from "src/app/services/user-api.service"
import { SetReps, Workout, WorkoutGet } from "src/interfaces"

@Component({
  selector: "app-workout-details-card",
  templateUrl: "./workout-details-card.component.html",
  styleUrls: ["./workout-details-card.component.css"],
})
export class WorkoutDetailsCardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiWorkoutService: ApiWorkoutService,
    private apiUserService: UserApiService
  ) {}
  disableBtn = false

  id!: number
  workout: Workout = {
    id: 0,
    name: "",
    description: "",
    category: "",
    recommendedLevel: "",
    duration: 0,
    image: "",
    exercises: [],
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.apiWorkoutService
      .getWorkoutById(this.id)
      .subscribe((workout: WorkoutGet) => {
        const setsReps: SetReps[] = []
        workout.workoutExercises.forEach(workoutExercise => {
          const setReps: SetReps = {
            workoutId: workoutExercise.workoutId,
            exerciseId: workoutExercise.exerciseId,
            sets: workoutExercise.sets,
            reps: workoutExercise.reps,
            name: workoutExercise.exercise.name,
          }
          setsReps.push(setReps)
        })
        this.workout = {
          id: workout.id,
          name: workout.name,
          description: workout.description,
          image: workout.image,
          category: workout.category,
          recommendedLevel: workout.recommendedLevel,
          duration: workout.duration,
          exercises: setsReps,
        }
      })
  }

  goToDetails(exerciseId: number) {
    this.router.navigate(["/exercises", exerciseId])
  }

  handleAdd(workout: Workout): void {
    this.apiUserService.addWorkout(workout)
    this.disableBtn = true
  }
}
