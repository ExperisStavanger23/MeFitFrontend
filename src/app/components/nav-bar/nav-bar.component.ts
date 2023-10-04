import { Component } from "@angular/core"
import { KeycloakService } from "keycloak-angular"

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent {
  isLoggedIn = this.keycloak.isLoggedIn()

  constructor(private readonly keycloak: KeycloakService) {}

  login(): void {
    this.keycloak.login({
      redirectUri: "http://localhost:4200/onboarding",
    })
  }

  logout(): void {
    this.keycloak.logout("http://localhost:4200")
  }
}
