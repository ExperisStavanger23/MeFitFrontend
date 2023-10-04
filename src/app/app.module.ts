import { APP_INITIALIZER, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatButtonModule } from "@angular/material/button"
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular"
import { environment } from "src/environment/environment"
import { NavBarComponent } from "./components/nav-bar/nav-bar.component"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { OnboardingPage } from "./pages/onboarding/onboarding.page"
import { MatSelectModule } from "@angular/material/select"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core";
import { ProgramsPage } from './pages/programs/programs.page';
import { WorkoutsPage } from './pages/workouts/workouts.page';
import { ExercisesPage } from './pages/exercises/exercises.page';
import { ProfilePage } from './pages/profile/profile.page'

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakUrl,
        realm: environment.keycloakRealm,
        clientId: environment.keycloakClientId,
      },
      initOptions: {
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/assets/silent-check-sso.html",
      },
    })
}

@NgModule({
  declarations: [AppComponent, OnboardingPage, NavBarComponent, ProgramsPage, WorkoutsPage, ExercisesPage, ProfilePage],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
