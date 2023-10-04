import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.page.html",
  styleUrls: ["./onboarding.page.css"],
})
export class OnboardingPage {
  form: FormGroup
  minDate = new Date(1950, 1, 1)
  maxDate = new Date().getFullYear()

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      experience: [null],
      gender: [null],
      height: [null, Validators.pattern("^([5-9][0-9]|[1-2][0-9]{2}|300)$")],
      weight: [null, Validators.pattern("^([2-9][0-9]|[1-9][0-9][0-9])$")],
      bDay: [null],
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
