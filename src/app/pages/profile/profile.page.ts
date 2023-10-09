import { Component, OnInit } from "@angular/core"
import { UserApiService } from "src/app/services/user-api.service"
import { User } from "src/interfaces"
import { MatDialog } from "@angular/material/dialog"
import { getTokenClaims } from "src/helper-functions"
import { KeycloakService } from "keycloak-angular"
import { EMPTY, Observable } from "rxjs"

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.css"],
})
export class ProfilePage implements OnInit {
  user: Observable<User> = EMPTY
  // {
  //   id: "0",
  //   email: "",
  //   bio: "",
  //   birthday: "",
  //   created: [],
  //   experienceLvl: 0,
  //   gender: "",
  //   goals: [],
  //   height: 0,
  //   name: "",
  //   profilePicture: "",
  //   role: {
  //     id: 0,
  //     roleTitle: "string",
  //   },
  //   userExercises: [],
  //   userPrograms: [],
  //   userWorkouts: [],
  //   weight: 0,
  // }
  // bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur fermentum maximus. Etiam vulputate eleifend gravida. Etiam velit lectus, laoreet et nisi et, commodo mattis tellus. Phasellus at risus sit amet magna tincidunt tincidunt in sit amet ante. Integer blandit est massa, vel pharetra est vestibulum sit amet. In eget dui nibh. Aenean posuere auctor ipsum at bibendum. Etiam vitae justo et metus fermentum egestas in ut dolor.",

  constructor(
    private userService: UserApiService,
    public dialog: MatDialog,
    private keycloak: KeycloakService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this.userService.getUser(
      getTokenClaims(await this.keycloak.getToken()).sub
    )
    this.user = user
  }
}
