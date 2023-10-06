import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { OnboardingPage } from "./pages/onboarding/onboarding.page"
import { ProgramsPage } from "./pages/programs/programs.page"
import { WorkoutsPage } from "./pages/workouts/workouts.page"
import { ExercisesPage } from "./pages/exercises/exercises.page"
import { ProfilePage } from "./pages/profile/profile.page"
import { DashboardPage } from "./pages/dashboard/dashboard.page"
import { DetailsCardComponent } from "./components/details-card/details-card.component"
import { WorkoutDetailsCardComponent } from "./components/workout-details-card/workout-details-card.component"
import { CreationPage } from "./pages/creation/creation.page"

const routes: Routes = [
  { path: "onboarding", component: OnboardingPage },
  { path: "dashboard", component: DashboardPage },
  { path: "programs", component: ProgramsPage },
  { path: "programs/:id", component: DetailsCardComponent },
  { path: "workouts", component: WorkoutsPage },
  { path: "workouts/:id", component: WorkoutDetailsCardComponent },
  { path: "exercises", component: ExercisesPage },
  { path: "profile", component: ProfilePage },
  { path: "creation", component: CreationPage },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
