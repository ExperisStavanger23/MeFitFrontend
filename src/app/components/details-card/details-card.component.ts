import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: "app-details-card",
  templateUrl: "./details-card.component.html",
  styleUrls: ["./details-card.component.css"],
})
export class DetailsCardComponent implements OnInit {
  id = 0
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
  }

  name = "Running"
  description =
    "Running is a method of terrestrial locomotion allowing humans and other animals to move rapidly on foot."
  stats: Record<string, string> = {
    level: "intermediate",
    Category: "Endurance",
  }
  orderOfKeys: string[] = ["level", "Category", "Workouts", "Duration"]
  imgUrl =
    "https://hips.hearstapps.com/hmg-prod/images/running-track-1667904802.jpg?crop=0.668xw:1.00xh;0.0737xw,0&resize=1200:*"
  workouts = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  tags = ["running", "endurance", "cardio"]
  creator = "John Doe"
}
