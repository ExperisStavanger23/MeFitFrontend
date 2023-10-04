import { Component } from "@angular/core"
import { Router } from "@angular/router"
@Component({
  selector: "app-programs",
  templateUrl: "./programs.page.html",
  styleUrls: ["./programs.page.css"],
})
export class ProgramsPage {
  constructor(private router: Router) {}

  ids: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  setSelectedId(id: number) {
    this.router.navigate(["/programs", id])
  }
}
