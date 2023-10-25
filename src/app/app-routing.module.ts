import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { OnboardingPage } from "./pages/onboarding/onboarding.page"
import { ProgramsPage } from "./pages/programs/programs.page"
import { WorkoutsPage } from "./pages/workouts/workouts.page"
import { ExercisesPage } from "./pages/exercises/exercises.page"
import { ProfilePage } from "./pages/profile/profile.page"
import { DashboardPage } from "./pages/dashboard/dashboard.page"
import { CreationPage } from "./pages/creation/creation.page"
import { ProfileEditPage } from "./pages/profile-edit/profile-edit.page"
import { ExerciseDetailsCardComponent } from "./components/exercise-components/exercise-details-card/exercise-details-card.component"
import { WorkoutDetailsCardComponent } from "./components/workout-components/workout-details-card/workout-details-card.component"
import { AuthGuard } from "./guard/auth.guard"
import { ProgramDetailsCardComponent } from "./components/program-components/program-details-card/program-details-card.component"
import { LandingPage } from "./pages/landing/landing.page"
import { NotFoundPage } from "./pages/not-found/not-found.page"

const routes: Routes = [
  { path: "", component: LandingPage },
  { path: "onboarding", component: OnboardingPage },
  { path: "dashboard", component: DashboardPage, canActivate: [AuthGuard] },
  { path: "programs", component: ProgramsPage },
  { path: "programs/:id", component: ProgramDetailsCardComponent },
  { path: "workouts", component: WorkoutsPage },
  { path: "workouts/:id", component: WorkoutDetailsCardComponent },
  { path: "exercises", component: ExercisesPage },
  { path: "exercises/:id", component: ExerciseDetailsCardComponent },
  { path: "profile", component: ProfilePage, canActivate: [AuthGuard] },
  { path: "profile/edit", component: ProfileEditPage },
  { path: "creation", component: CreationPage },
  { path: "**", component: NotFoundPage },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
