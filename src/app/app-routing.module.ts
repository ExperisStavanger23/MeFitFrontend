import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { OnboardingPage } from "./pages/onboarding/onboarding.page"

const routes: Routes = [
  { path: "onboarding", component: OnboardingPage },
  { path: "path2", component: OnboardingPage },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
