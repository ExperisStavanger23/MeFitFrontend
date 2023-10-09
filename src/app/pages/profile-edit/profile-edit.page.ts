import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { KeycloakService } from "keycloak-angular"
import { firstValueFrom } from "rxjs"
import { UserApiService } from "src/app/services/user-api.service"
import { getTokenClaims } from "src/helper-functions"
import { User } from "src/interfaces"
@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.page.html",
  styleUrls: ["./profile-edit.page.css"],
})
export class ProfileEditPage implements OnInit {
  form: FormGroup
  constructor(
    private fb: FormBuilder,
    private userService: UserApiService,
    private keycloak: KeycloakService,
    private router: Router
  ) {
    this.form = fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      bio: [null, Validators.maxLength(250)],
      height: [null, Validators.pattern("^([5-9][0-9]|[1-2][0-9]{2}|300)$")],
      weight: [null, Validators.pattern("^([2-9][0-9]|[1-9][0-9][0-9])$")],
      experienceLvl: [null],
      profilePicture: [null],
    })
  }

  async ngOnInit(): Promise<void> {
    const user = this.userService.getUser(
      getTokenClaims(await this.keycloak.getToken()).sub
    )
    const data = await firstValueFrom(user)
    this.form.setValue({
      name: data.name,
      email: data.email,
      bio: data.bio,
      weight: data.weight,
      height: data.height,
      experienceLvl: data.experienceLvl,
      profilePicture: data.profilePicture,
    })
  }

  async handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault()
    if (this.form.invalid) {
      console.log("form is invalid")
      return
    }
    const user = this.userService.getUser(
      getTokenClaims(await this.keycloak.getToken()).sub
    )
    const data = await firstValueFrom(user)
    const userToUpdate: User = {
      ...data,
      ...this.form.value,
      role: {
        // TODO Remove role when backend is fixed
        id: 0,
        roleTitle: "string",
      },
    }

    this.userService.updateUser(userToUpdate)
    this.router.navigate(["/profile"])
  }
}