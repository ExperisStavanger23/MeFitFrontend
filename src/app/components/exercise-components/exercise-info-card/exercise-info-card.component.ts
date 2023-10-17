import { Component, Input, Output, EventEmitter } from "@angular/core"
import { Exercise } from "src/interfaces"
@Component({
  selector: "app-exercise-info-card",
  templateUrl: "./exercise-info-card.component.html",
  styleUrls: ["./exercise-info-card.component.css"],
})
export class ExerciseInfoCardComponent {
  @Input() canAdd = false
  @Input() exercise!: Exercise

  @Output() emitterId = new EventEmitter<number>()

  add() {
    throw new Error("Method not implemented.")
  }
  emitId() {
    if (!this.exercise) return
    this.emitterId.emit(this.exercise.id)
  }
}
