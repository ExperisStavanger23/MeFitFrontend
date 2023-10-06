import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { workout } from "src/types"

@Component({
  selector: "app-exercise-creation-form",
  templateUrl: "./exercise-creation-form.component.html",
  styleUrls: ["./exercise-creation-form.component.css"],
})
export class ExerciseCreationFormComponent {
  form: FormGroup

  constructor(private fb: FormBuilder) {
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
  }
}
