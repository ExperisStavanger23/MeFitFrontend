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
  whOpen = false
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

  handleWhOpen(): void {
    this.whOpen = !this.whOpen
  }
}
