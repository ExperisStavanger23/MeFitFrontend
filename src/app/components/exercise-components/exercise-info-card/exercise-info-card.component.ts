import { Component, Input, Output, EventEmitter } from "@angular/core"
import { Exercise } from "src/types"
@Component({
  selector: "app-exercise-info-card",
  templateUrl: "./exercise-info-card.component.html",
  styleUrls: ["./exercise-info-card.component.css"],
})
export class ExerciseInfoCardComponent {
  @Input() canAdd = false
  @Input() exercise!: Exercise

  @Output() emitterId = new EventEmitter<number>() //TODO: replace with exercise

  add() {
    throw new Error("Method not implemented.")
  }
  emitId() {
    if (!this.exercise) return
    this.emitterId.emit(this.exercise.id)
  }
}
