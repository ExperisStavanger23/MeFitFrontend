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
    category: "",
    recommendedLevel: "",
    duration: 0,
    image: "",
    workouts: [],
  }
  disableBtn = false

  async ngOnInit(): Promise<void> {
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

    const user = await this.apiUserService.getUser()
    const up = user.userPrograms?.find(up => up.programId == this.id)
    if (up) {
      this.disableBtn = true
    }
  }

  goToDetails(id: number) {
    this.router.navigate(["/workouts", id])
  }

  handleAdd(program: Program): void {
    this.apiUserService.addProgram(program.id, program.duration)
    this.disableBtn = true
  }

  private isImageUrlValid(url: string): boolean {
    const pattern =
      /(http(s?):\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg|webp|tif|tiff))/i
    return pattern.test(url)
  }
}
