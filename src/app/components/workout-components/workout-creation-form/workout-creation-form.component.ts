import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatSnackBar } from "@angular/material/snack-bar"
import { ApiExercisesService } from "src/app/services/api-exercises.service"
import { ApiWorkoutService } from "src/app/services/api-workout.service"
import { PostWorkout, SetReps, Workout } from "src/interfaces"
import { Exercise, ExerciseSetRep } from "src/types"

@Component({
  selector: "app-workout-creation-form",
  templateUrl: "./workout-creation-form.component.html",
  styleUrls: ["./workout-creation-form.component.css"],
})
export class WorkoutCreationFormComponent implements OnInit {
  form: FormGroup
  selectedExercisesSetRep: ExerciseSetRep[] = []

  //TODO: replace with data from database/api
  experienceLevels = ["Beginner", "Intermediate", "Advanced"]
  workoutCategories = ["StressReduction", "MuscleGain", "Bulking"]

  exercises: Exercise[] = []

  constructor(
    private fb: FormBuilder,
    private apiWorkoutsService: ApiWorkoutService,
    private apiExerciseService: ApiExercisesService,
    public snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      experienceLevel: ["", Validators.required],
      imageUrl: [""],
      workouts: [[]],
      category: ["", Validators.required],
      duration: [0, Validators.required],
      tags: [null],
    })
  }

  ngOnInit(): void {
    this.apiExerciseService
      .getAllExercises()
      .subscribe((exercises: Exercise[]) => {
        this.exercises = exercises
      })
  }

  addSelectedExercise(selectedExerciseIds: number[]) {
    this.selectedExercisesSetRep = []
    selectedExerciseIds.forEach(exerciseId => {
      const exercise = this.exercises.find(ex => ex.id === exerciseId)
      if (exercise) {
        this.selectedExercisesSetRep.push({
          id: exercise.id,
          name: exercise.name,
          sets: 1,
          reps: 10,
        })

        // Create form controls for sets and reps and add them to the form group
        this.form.addControl(`sets_${exercise.id}`, this.fb.control(1))
        this.form.addControl(`reps_${exercise.id}`, this.fb.control(10))
      }
    })
  }

  removeExercise(index: number) {
    this.selectedExercisesSetRep.splice(index, 1)
  }

  handleSubmit(event: Event): void {
    event.preventDefault()

    // Create an array to store the exercises with sets and reps
    const exercisesWithSetsReps: SetReps[] = []

    // Loop through the selected exercises and retrieve sets and reps from the form
    for (const selectedExercise of this.selectedExercisesSetRep) {
      const setsControlName = `sets_${selectedExercise.id}`
      const repsControlName = `reps_${selectedExercise.id}`

      const sets = this.form.get(setsControlName)?.value || 0
      const reps = this.form.get(repsControlName)?.value || 0

      exercisesWithSetsReps.push({
        exerciseId: selectedExercise.id,
        workoutId: 0,
        name: selectedExercise.name,
        sets,
        reps,
      })
    }

    const workoutToPost: PostWorkout = {
      name: this.form.value.name,
      description: this.form.value.description,
      category: this.form.value.category[0],
      recommendedLevel: this.form.value.experienceLevel,
      duration: this.form.value.duration,
      image: this.form.value.imageUrl,
      workoutExercises: exercisesWithSetsReps,
    }
    console.log(workoutToPost)

    this.apiWorkoutsService
      .postWorkout(workoutToPost)
      .subscribe((response: boolean) => {
        if (response) {
          this.snackBar.open("Exercise created successfully", "Created", {
            duration: 3000,
            panelClass: "snackbar-success",
          })
          this.form.reset()
        } else {
          this.snackBar.open("Exercise creation failed", "Failed", {
            duration: 1000,
            panelClass: "snackbar-fail",
          })
        }
      })
    // Now, exercisesWithSetsReps contains the selected exercises with sets and reps
    // console.log(exercisesWithSetsReps)

    // // You can also access other form values using this.form.value
    // console.log(this.form.value)
  }
}
