import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { KeycloakService } from "keycloak-angular"
import { PostUser } from "src/interfaces"
import { UserApiService } from "src/app/services/user-api.service"
import { getTokenClaims } from "src/helper-functions"

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
    private keycloak: KeycloakService,
    private userApi: UserApiService
  ) {
    this.form = fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      experienceLvl: [null],
      gender: [null],
      height: [null, Validators.pattern("^([5-9][0-9]|[1-2][0-9]{2}|300)$")],
      weight: [null, Validators.pattern("^([2-9][0-9]|[1-9][0-9][0-9])$")],
      birthday: [null],
    })
  }

  async ngOnInit(): Promise<void> {
    const claims = getTokenClaims(await this.keycloak.getToken())
    this.form.setValue({
      ...this.form.value,
      name: claims.given_name,
      email: claims.email,
    })
  }

  async handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault()
    const claims = getTokenClaims(await this.keycloak.getToken())

    const birthday = dateformater(this.form.value.birthday)

    const userToPost: PostUser = {
      ...this.form.value,
      bio: "",
      profilePicture: "",
      birthday: birthday,
      id: claims.sub,
      experienceLvl: parseInt(this.form.value.experienceLvl),
    }

    this.userApi.postUser(userToPost)
  }
}

function dateformater(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}
