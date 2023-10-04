import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { OnboardingPage } from "./pages/onboarding/onboarding.page"
import { ProgramsPage } from "./pages/programs/programs.page"
import { WorkoutsPage } from "./pages/workouts/workouts.page"
import { ExercisesPage } from "./pages/exercises/exercises.page"
import { ProfilePage } from "./pages/profile/profile.page"
import { InfoCardComponent } from "./components/info-card/info-card.component"
import { DashboardPage } from "./pages/dashboard/dashboard.page"

const routes: Routes = [
  { path: "onboarding", component: OnboardingPage },
  { path: "dashboard", component: DashboardPage },
  { path: "programs", component: ProgramsPage },
  { path: "workouts", component: WorkoutsPage },
  { path: "Exercises", component: ExercisesPage },
  { path: "profile", component: ProfilePage },
  { path: "", component: InfoCardComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
