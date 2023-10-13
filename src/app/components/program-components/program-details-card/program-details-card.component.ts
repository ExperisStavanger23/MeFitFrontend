import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { EMPTY, Observable } from "rxjs"
import { ApiProgramService } from "src/app/services/api-program.service"
import { ApiWorkoutService } from "src/app/services/api-workout.service"
import { UserApiService } from "src/app/services/user-api.service"
import { Program, User } from "src/interfaces"

@Component({
  selector: "app-program-details-card",
  templateUrl: "./program-details-card.component.html",
  styleUrls: ["./program-details-card.component.css"],
})
export class ProgramDetailsCardComponent implements OnInit {
  // userProgram: UserProgram
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiProgramService: ApiProgramService,
    private apiWorkoutService: ApiWorkoutService,
    private apiUserService: UserApiService
  ) {}

  user: Observable<User> = EMPTY
  id!: number
  program: Program = {
    id: 0,
    name: "",
    description: "",
    category: 0,
    recommendedLevel: 0,
    duration: 0,
    image: "",
    workouts: [],
  }
  disableBtn = false

  ngOnInit(): void {
    console.log("programDetails onInit")
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
          workouts: program.workouts,
        }
      })

    const up = this.apiUserService._user$.value.userPrograms?.find(
      up => up.programId == this.id
    )

    if (up) {
      this.disableBtn = true
    }
  }

  goToDetails(id: number) {
    this.router.navigate(["/workouts", id])
  }

  handleAdd(programId: number): void {
    console.log(`handle add program: ${programId}`)
    this.apiUserService.addProgram(programId)
    this.disableBtn = true
  }
}
