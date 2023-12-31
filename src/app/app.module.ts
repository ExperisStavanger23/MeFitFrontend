import { APP_INITIALIZER, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatButtonModule } from "@angular/material/button"
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular"
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
import { MatCardModule } from "@angular/material/card"
import { MatTableModule } from "@angular/material/table"
import { DashboardPage } from "./pages/dashboard/dashboard.page"
import { NgChartsModule } from "ng2-charts"
import { WorkoutDetailsCardComponent } from "./components/workout-components/workout-details-card/workout-details-card.component"
import { HttpClientModule } from "@angular/common/http"
import { CreationPage } from "./pages/creation/creation.page"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { ProfileEditPage } from "./pages/profile-edit/profile-edit.page"
import { ProgramCreationFormComponent } from "./components/program-components/program-creation-form/program-creation-form.component"
import { WorkoutCreationFormComponent } from "./components/workout-components/workout-creation-form/workout-creation-form.component"
import { ExerciseCreationFormComponent } from "./components/exercise-components/exercise-creation-form/exercise-creation-form.component"
import { ExerciseDetailsCardComponent } from "./components/exercise-components/exercise-details-card/exercise-details-card.component"
import { ExerciseInfoCardComponent } from "./components/exercise-components/exercise-info-card/exercise-info-card.component"
import { WorkoutInfoCardComponent } from "./components/workout-components/workout-info-card/workout-info-card.component"
import { SafePipeService } from "./services/pipes/safe-pipe.service"
import { MatMenuModule } from "@angular/material/menu"
import { ProgramInfoCardComponent } from "./components/program-components/program-info-card/program-info-card.component"
import { ProgramDetailsCardComponent } from "./components/program-components/program-details-card/program-details-card.component"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatRadioModule } from "@angular/material/radio"
import { CamelCaseToSpacePipe } from "./services/pipes/camel-case-to-space.pipe"
import { LandingPage } from "./pages/landing/landing.page"
import { NotFoundPage } from "./pages/not-found/not-found.page"
import { AdminPage } from "./pages/admin/admin.page"
import { MatDialogModule } from "@angular/material/dialog";
import { DialogComponent } from './components/dialog/dialog.component'

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: import.meta.env["NG_APP_keycloakUrl"],
        realm: import.meta.env["NG_APP_keycloakRealm"],
        clientId: import.meta.env["NG_APP_keycloakClientId"],
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
    DashboardPage,
    WorkoutDetailsCardComponent,
    CreationPage,
    ProgramCreationFormComponent,
    WorkoutCreationFormComponent,
    ExerciseCreationFormComponent,
    ExerciseDetailsCardComponent,
    ExerciseInfoCardComponent,
    ProfileEditPage,
    WorkoutInfoCardComponent,
    SafePipeService,
    ProgramInfoCardComponent,
    ProgramDetailsCardComponent,
    CamelCaseToSpacePipe,
    LandingPage,
    NotFoundPage,
    AdminPage,
    DialogComponent,
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
    HttpClientModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    MatRadioModule,
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
