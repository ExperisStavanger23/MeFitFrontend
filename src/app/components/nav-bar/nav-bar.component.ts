import { Component, OnChanges, OnInit } from "@angular/core"
import { KeycloakService } from "keycloak-angular"
import { EMPTY, Observable } from "rxjs"
import { UserApiService } from "src/app/services/user-api.service"
import { User } from "src/interfaces"

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit, OnChanges {
  isLoggedIn = this.keycloak.isLoggedIn()
  user: Observable<User> = EMPTY

  constructor(
    private readonly keycloak: KeycloakService,
    private userApi: UserApiService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log("navOnint")
    if (await this.isLoggedIn) {
      const user = this.userApi.user.asObservable()
      this.user = user
    }
  }

  ngOnChanges(): void {
    console.log("chaning stuff")
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
