import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatSnackBar } from "@angular/material/snack-bar"
import { ApiExercisesService } from "src/app/services/api-exercises.service"
import { Exercise } from "src/types"

@Component({
  selector: "app-exercise-creation-form",
  templateUrl: "./exercise-creation-form.component.html",
  styleUrls: ["./exercise-creation-form.component.css"],
})
export class ExerciseCreationFormComponent {
  form: FormGroup
  creating = false
  valid = false

  constructor(
    private fb: FormBuilder,
    private apiExercisesService: ApiExercisesService,

    public snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      name: ["", Validators.required],
      description: ["", [Validators.required]],
      imageUrl: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /(http(s?):\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg|webp|tif|tiff))/i
          ),
        ],
      ],
      videoUrl: [""],
    })
    this.form.valueChanges.subscribe(() => {
      this.valid =
        this.form.get("name")?.value &&
        this.form.get("description")?.value &&
        this.isImageUrlValid(this.form.get("imageUrl")?.value)
    })
  }

  handleSubmit(event: SubmitEvent): void {
    this.creating = true
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
          this.snackBar.open("Exercise created successfully", "Created", {
            duration: 1000,
            panelClass: "snackbar-success",
          })
        } else {
          this.snackBar.open("Exercise creation failed", "Failed", {
            duration: 1000,
            panelClass: "snackbar-fail",
          })
        }
      })
    this.creating = false
  }

  // This function checks if the URL is a valid image URL
  private isImageUrlValid(url: string): boolean {
    const pattern =
      /(http(s?):\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg|webp|tif|tiff))/i
    return pattern.test(url)
  }
}
