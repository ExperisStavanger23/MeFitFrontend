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
import { MatNativeDateModule } from "@angular/material/core"
import { ProgramsPage } from "./pages/programs/programs.page"
import { WorkoutsPage } from "./pages/workouts/workouts.page"
import { ExercisesPage } from "./pages/exercises/exercises.page"
import { ProfilePage } from "./pages/profile/profile.page"
import { InfoCardComponent } from "./components/info-card/info-card.component"
import { MatCardModule } from "@angular/material/card"
import { MatTableModule } from "@angular/material/table"
import { DashboardPage } from "./pages/dashboard/dashboard.page"
import { NgChartsModule } from "ng2-charts"
import { BarChartComponent } from "./components/bar-chart/bar-chart.component"
import { DetailsCardComponent } from "./components/details-card/details-card.component"

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
  declarations: [
    AppComponent,
    OnboardingPage,
    NavBarComponent,
    ProgramsPage,
    WorkoutsPage,
    ExercisesPage,
    ProfilePage,
    InfoCardComponent,
    DashboardPage,
    BarChartComponent,
    DetailsCardComponent,
  ],
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
    MatCardModule,
    MatTableModule,
    NgChartsModule,
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
