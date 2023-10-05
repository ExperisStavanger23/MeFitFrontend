import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { KeycloakService } from "keycloak-angular"
import jwt_decode from "jwt-decode"

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.page.html",
  styleUrls: ["./onboarding.page.css"],
})
export class OnboardingPage implements OnInit {
  form: FormGroup
  minDate = new Date(1950, 1, 1)
  maxDate = new Date().getFullYear()

  constructor(
    private fb: FormBuilder,
    private keycloak: KeycloakService
  ) {
    console.log("Constructor")
    this.form = fb.group({})
  }

  async ngOnInit(): Promise<void> {
    console.log("onInit")

    await this.getTokenClaims()
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      experience: [null],
      gender: [null],
      height: [null, Validators.pattern("^([5-9][0-9]|[1-2][0-9]{2}|300)$")],
      weight: [null, Validators.pattern("^([2-9][0-9]|[1-9][0-9][0-9])$")],
      bDay: [null],
    })

    console.log("endOnInit")
  }

  handleSubmit(event: SubmitEvent): void {
    event.preventDefault()
    console.log(this.form.value)
  }

  private async getTokenClaims(): Promise<object> {
    const token = await this.keycloak.getToken()
    const claims: object = jwt_decode(token)
    return {}
  }
}
