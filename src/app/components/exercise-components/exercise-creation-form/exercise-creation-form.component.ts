import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatSnackBar } from "@angular/material/snack-bar"
import { ApiExercisesService } from "src/app/services/api-exercises.service"
import { Exercise } from "src/types"
import { SnackbarComponent } from "../../snackbar/snackbar.component"

@Component({
  selector: "app-exercise-creation-form",
  templateUrl: "./exercise-creation-form.component.html",
  styleUrls: ["./exercise-creation-form.component.css"],
})
export class ExerciseCreationFormComponent {
  form: FormGroup
  created = false

  constructor(
    private fb: FormBuilder,
    private apiExercisesService: ApiExercisesService,
    public snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      name: ["", Validators.required],
      description: ["", [Validators.required]],
      imageUrl: [""],
      videoUrl: [""],
    })
  }

  handleSubmit(event: SubmitEvent): void {
    event.preventDefault()
    console.log(this.form.value)
    const exercise: Exercise = {
      id: 0,
      name: this.form.value.name,
      description: this.form.value.description,
      image: this.form.value.imageUrl,
      video: this.form.value.videoUrl,
    }
    this.apiExercisesService
      .postExercise(exercise)
      .subscribe((response: boolean) => {
        if (response) {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 1000,
            data: {
              description: "Exercise created successfully",
              color: "blue",
            },
          })
        }
      })
  }
}
