import { BooleanInput } from "@angular/cdk/coercion"
import { Component } from "@angular/core"

@Component({
  selector: "app-creation",
  templateUrl: "./creation.page.html",
  styleUrls: ["./creation.page.css"],
})
export class CreationPage {
  createProgram = true
  createWorkout: BooleanInput

  setCreateProgram(arg0: boolean) {
    this.createProgram = arg0
    this.createWorkout = !arg0
  }
  setCreateWorkout(arg0: boolean) {
    this.createProgram = !arg0
    this.createWorkout = arg0
  }
}
