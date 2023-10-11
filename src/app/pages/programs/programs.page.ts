import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { Observable } from "rxjs"
import { ApiProgramService } from "src/app/services/api-program.service"
import { Program } from "src/interfaces"
@Component({
  selector: "app-programs",
  templateUrl: "./programs.page.html",
  styleUrls: ["./programs.page.css"],
})
export class ProgramsPage implements OnInit {
  constructor(
    private router: Router,
    private apiProgramService: ApiProgramService
  ) {}

  programs$: Observable<Program[]> = new Observable<Program[]>()

  ngOnInit(): void {
    this.programs$ = this.apiProgramService.getAllPrograms()
  }

  setSelectedId(id: number) {
    this.router.navigate(["/programs", id])
  }
}
