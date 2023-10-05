import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { OnboardingPage } from "./pages/onboarding/onboarding.page"
import { ProgramsPage } from "./pages/programs/programs.page"
import { WorkoutsPage } from "./pages/workouts/workouts.page"
import { ExercisesPage } from "./pages/exercises/exercises.page"
import { ProfilePage } from "./pages/profile/profile.page"
import { DetailsCardComponent } from "./components/details-card/details-card.component"
import { WorkoutDetailsCardComponent } from "./components/workout-details-card/workout-details-card.component"

const routes: Routes = [
  { path: "onboarding", component: OnboardingPage },
  { path: "programs", component: ProgramsPage },
  { path: "programs/:id", component: DetailsCardComponent },
  { path: "workouts", component: WorkoutsPage },
  { path: "workouts/:id", component: WorkoutDetailsCardComponent },
  { path: "Exercises", component: ExercisesPage },
  { path: "profile", component: ProfilePage },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
