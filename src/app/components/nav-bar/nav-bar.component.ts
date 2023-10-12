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
      this.userApi.userExists(claims.sub).subscribe({
        next: () => {
          this.userApi.setUser(claims.sub)
        },
      })

      this.user = this.userApi.user$
    }
  }

  login(): void {
    this.keycloak.login({
      redirectUri: "http://localhost:4200/onboarding",
    })
  }

  logout(): void {
    this.keycloak.logout("http://localhost:4200")
  }
}
