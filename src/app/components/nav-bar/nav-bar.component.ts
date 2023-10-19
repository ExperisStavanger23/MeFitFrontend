import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { KeycloakService } from "keycloak-angular"
import { EMPTY, Observable, firstValueFrom } from "rxjs"
import { UserApiService } from "src/app/services/user-api.service"
import { getTokenClaims } from "src/helper-functions"
import { User } from "src/interfaces"

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  isLoggedIn = this.keycloak.isLoggedIn()
  user: Observable<User> = EMPTY
  userRolesID: number[] = new Array<number>()

  constructor(
    private readonly keycloak: KeycloakService,
    private userApi: UserApiService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    if (await this.isLoggedIn) {
      const claims = getTokenClaims(await this.keycloak.getToken())
      const userExists = await this.userApi.userExists(claims.sub)
      if (userExists) {
        this.userApi.setUser()
      } else {
        this.router.navigate(["/onboarding"])
      }

      this.user = this.userApi.user$
      const user = await firstValueFrom(this.user)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      for (const ur of user.userRoles!) {
        this.userRolesID.push(ur.roleId)
      }
      console.log(this.userRolesID)
      this.userRolesID.includes(3)
    }
  }

  login(): void {
    this.keycloak.login({
      redirectUri: window.location.origin + "/#/onboarding",
    })
  }

  logout(): void {
    this.keycloak.logout(window.location.origin)
  }
}
