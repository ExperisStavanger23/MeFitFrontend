import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { KeycloakService } from "keycloak-angular"

@Component({
  selector: "app-landing",
  templateUrl: "./landing.page.html",
  styleUrls: ["./landing.page.css"],
})
export class LandingPage {
  constructor(
    private router: Router,
    private readonly keycloak: KeycloakService
  ) {}

  navigateToPrograms(): void {
    this.router.navigate(["/programs"])
  }

  navigateToUser(): void {
    this.keycloak.login({
      redirectUri: window.location.origin + "/onboarding",
    })
  }
  navigateToWorkouts(): void {
    this.router.navigate(["/workouts"])
  }

  navigateToExercises(): void {
    this.router.navigate(["/exercises"])
  }
}
