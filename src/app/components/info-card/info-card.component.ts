import { Component } from "@angular/core"

@Component({
  selector: "app-info-card",
  templateUrl: "./info-card.component.html",
  styleUrls: ["./info-card.component.css"],
})
export class InfoCardComponent {
  // TODO: replace with data from API
  name = "Running"
  description =
    "Running is a method of terrestrial locomotion allowing humans and other animals to move rapidly on foot."
  orderOfKeys: string[] = ["level", "Category", "Workouts", "Duration"]
  stats: Record<string, string> = {
    level: "intermediate",
    Category: "Endurance",
  }
  add() {
    throw new Error("Method not implemented.")
  }
}
