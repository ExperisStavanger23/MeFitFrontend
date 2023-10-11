import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { ApiProgramService } from "src/app/services/api-program.service"
import { Program } from "src/interfaces"

@Component({
  selector: "app-program-details-card",
  templateUrl: "./program-details-card.component.html",
  styleUrls: ["./program-details-card.component.css"],
})
export class ProgramDetailsCardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiProgramService: ApiProgramService
  ) {}
  id!: number
  program: Program = {
    id: 0,
    name: "",
    description: "",
    category: 0,
    recommendedLevel: 0,
    duration: 0,
    image: "",
    workout: [],
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.apiProgramService
      .getProgramById(this.id)
      .subscribe((program: Program) => {
        this.program = {
          id: program.id,
          name: program.name,
          description: program.description,
          image: program.image,
          category: program.category,
          recommendedLevel: program.recommendedLevel,
          duration: program.duration,
          workout: program.workout,
        }
      })
  }

  goToDetails() {
    this.router.navigate(["/workouts", this.id])
  }
}
