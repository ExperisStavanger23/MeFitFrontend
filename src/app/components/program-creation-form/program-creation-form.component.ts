import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

@Component({
  selector: "app-program-creation-form",
  templateUrl: "./program-creation-form.component.html",
  styleUrls: ["./program-creation-form.component.css"],
})
export class ProgramCreationFormComponent {
  form: FormGroup
  minDate = new Date(1950, 1, 1)
  maxDate = new Date().getFullYear()

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

export interface UserModel {
  name: string
  email: string
}
