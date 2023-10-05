import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { KeycloakService } from "keycloak-angular"
import jwt_decode from "jwt-decode"
import { claims } from "../../../interfaces"

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

  async ngOnInit(): Promise<void> {
    const claims = await this.getTokenClaims()
    this.form.setValue({
      ...this.form.value,
      name: claims.given_name,
      email: claims.email,
    })

    console.log(claims)
  }

  handleSubmit(event: SubmitEvent): void {
    event.preventDefault()
    console.log(this.form.value)
  }

  private async getTokenClaims(): Promise<claims> {
    const token = await this.keycloak.getToken()
    const claims: claims = jwt_decode(token)
    return claims
  }
}
