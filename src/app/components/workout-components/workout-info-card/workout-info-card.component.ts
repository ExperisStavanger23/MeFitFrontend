import { Component, EventEmitter, Input, Output } from "@angular/core"
import { Workout } from "src/interfaces"

@Component({
  selector: "app-workout-info-card",
  templateUrl: "./workout-info-card.component.html",
  styleUrls: ["./workout-info-card.component.css"],
})
export class WorkoutInfoCardComponent {
  @Input() canAdd = false
  @Input() workout!: Workout

  @Output() emitterId = new EventEmitter<number>()

  add() {
    throw new Error("Method not implemented.")
  }
  emitId() {
    if (!this.workout) return
    this.emitterId.emit(this.workout.id)
  }
}
