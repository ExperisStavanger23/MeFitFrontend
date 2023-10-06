import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { workout } from "src/types"
@Component({
  selector: "app-program-creation-form",
  templateUrl: "./program-creation-form.component.html",
  styleUrls: ["./program-creation-form.component.css"],
})
export class ProgramCreationFormComponent {
  form: FormGroup

  //TODO: replace with data from database/api
  experienceLevels = ["Beginner", "Intermediate", "Advanced"]
  workoutCategories = ["Strength", "Cardio", "Yoga"]

  workout: workout = {
    id: 1,
    name: "Big Chest workout",
    duration: 1,
    description: "a set of chest exercises",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/muscular-man-doing-push-ups-during-home-workout-royalty-free-image-1678105289.jpg?crop=0.668xw:1.00xh;0.106xw,0&resize=1200:*",
    exercises: [
      {
        id: 1,
        name: "pushups",
        description: "pushups",
        imageUrl:
          "https://hips.hearstapps.com/hmg-prod/images/muscular-man-doing-push-ups-during-home-workout-royalty-free-image-1678105289.jpg?crop=0.668xw:1.00xh;0.106xw,0&resize=1200:*",
        tags: ["chest", "arms"],
      },
    ],
  }

  workouts: workout[] = [this.workout]

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: ["", Validators.required],
      description: ["", [Validators.required]],
      experienceLevel: [null, [Validators.required]],
      imageUrl: [""],
      workouts: [null, [Validators.required]],
      category: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      tags: [null],
    })
  }

  handleSubmit(event: SubmitEvent): void {
    event.preventDefault()
    console.log(this.form.value)
  }
}
