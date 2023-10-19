import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { KeycloakService } from "keycloak-angular"
import { User } from "src/interfaces"
import { UserApiService } from "src/app/services/user-api.service"
import { getTokenClaims } from "src/helper-functions"
import { Router } from "@angular/router"

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.page.html",
  styleUrls: ["./onboarding.page.css"],
})
export class OnboardingPage implements OnInit {
  form: FormGroup
  minDate = new Date(1950, 1, 1)
  maxDate = new Date().getFullYear()
  loading = true

  constructor(
    private fb: FormBuilder,
    private keycloak: KeycloakService,
    private userApi: UserApiService,
    private router: Router
  ) {
    this.form = fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      experienceLvl: [null, Validators.required],
      gender: [null, Validators.required],
      height: [
        null,
        Validators.required,
        Validators.pattern("^([5-9][0-9]|[1-2][0-9]{2}|300)$"),
      ],
      weight: [
        null,
        Validators.required,
        Validators.pattern("^([2-9][0-9]|[1-9][0-9][0-9])$"),
      ],
      birthday: [null, Validators.required],
      bio: ["", Validators.maxLength(250)],
      profilePicture: [""],
      workoutGoal: [null, Validators.required],
    })
  }

  async ngOnInit(): Promise<void> {
    if (!(await this.keycloak.isLoggedIn())) {
      this.keycloak.login({
        redirectUri: window.location.origin + "/#/onboarding",
      })
      return
    }

    const claims = getTokenClaims(await this.keycloak.getToken())

    const userExsists = await this.userApi.userExists(claims.sub)
    if (userExsists) {
      this.router.navigate(["/dashboard"])
      return
    }

    this.form.setValue({
      ...this.form.value,
      name: claims.given_name,
      email: claims.email,
    })

    this.loading = false
  }

  async handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault()
    if (this.form.invalid) {
      console.log("Form invalid")
      return
    }
    const claims = getTokenClaims(await this.keycloak.getToken())

    const birthday = dateformater(this.form.value.birthday)

    const userToPost: User = {
      ...this.form.value,
      birthday: birthday,
      id: claims.sub,
      experienceLvl: parseInt(this.form.value.experienceLvl),
    }
    this.userApi.postUser(userToPost)

    setTimeout(() => {
      this.router.navigate(["/dashboard"])
    }, 500)
  }
}

function dateformater(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}
