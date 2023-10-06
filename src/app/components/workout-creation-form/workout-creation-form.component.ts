import { Component } from "@angular/core"
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms"
import { exercise } from "src/types"

export type exerciseSetRep = {
  id: number
  name: string
  sets: number
  reps: number
}

@Component({
  selector: "app-workout-creation-form",
  templateUrl: "./workout-creation-form.component.html",
  styleUrls: ["./workout-creation-form.component.css"],
})
export class WorkoutCreationFormComponent {
  form: FormGroup
  selectedExercisesSetRep: exerciseSetRep[] = []

  //TODO: replace with data from database/api
  experienceLevels = ["Beginner", "Intermediate", "Advanced"]
  workoutCategories = ["Strength", "Cardio", "Yoga"]

  exercise: exercise = {
    id: 1,
    name: "pushups",
    description: "pushups",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/muscular-man-doing-push-ups-during-home-workout-royalty-free-image-1678105289.jpg?crop=0.668xw:1.00xh;0.106xw,0&resize=1200:*",
    tags: ["chest", "arms"],
  }
  exercise2: exercise = {
    id: 2,
    name: "situps",
    description: "situps",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/muscular-man-doing-push-ups-during-home-workout-royalty-free-image-1678105289.jpg?crop=0.668xw:1.00xh;0.106xw,0&resize=1200:*",
    tags: ["abs", "core"],
  }

  exercises: exercise[] = [this.exercise, this.exercise2]

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      experienceLevel: [null, Validators.required],
      imageUrl: [""],
      workouts: [[]],
      category: [null, Validators.required],
      duration: [null, Validators.required],
      tags: [null],
    })
  }

  addSelectedExercise(selectedExerciseIds: number[]) {
    console.log(selectedExerciseIds)
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
    const exercisesWithSetsReps: exerciseSetRep[] = []

    // Loop through the selected exercises and retrieve sets and reps from the form
    for (const selectedExercise of this.selectedExercisesSetRep) {
      const setsControlName = `sets_${selectedExercise.id}`
      const repsControlName = `reps_${selectedExercise.id}`

      const sets = this.form.get(setsControlName)?.value || 0
      const reps = this.form.get(repsControlName)?.value || 0

      exercisesWithSetsReps.push({
        id: selectedExercise.id,
        name: selectedExercise.name,
        sets,
        reps,
      })
    }

    // Now, exercisesWithSetsReps contains the selected exercises with sets and reps
    console.log(exercisesWithSetsReps)

    // You can also access other form values using this.form.value
    console.log(this.form.value)
  }
}
