import { Component, EventEmitter, Input, Output } from "@angular/core"
import { Program } from "src/interfaces"

@Component({
  selector: "app-program-info-card",
  templateUrl: "./program-info-card.component.html",
  styleUrls: ["./program-info-card.component.css"],
})
export class ProgramInfoCardComponent {
  @Input() canAdd = false
  @Input() program!: Program

  @Output() emitterId = new EventEmitter<number>()

  add() {
    throw new Error("Method not implemented.")
  }
  emitId() {
    if (!this.program) return
    this.emitterId.emit(this.program.id)
  }
}
