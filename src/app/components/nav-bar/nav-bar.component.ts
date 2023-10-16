import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { KeycloakService } from "keycloak-angular"
import { EMPTY, Observable } from "rxjs"
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
    }
  }

  login(): void {
    this.keycloak.login({
      redirectUri: window.location.origin + "/onboarding",
    })
  }

  logout(): void {
    this.keycloak.logout(window.location.origin)
  }
}
