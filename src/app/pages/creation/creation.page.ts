import { Component } from "@angular/core"
import { MatRadioChange } from "@angular/material/radio"

@Component({
  selector: "app-creation",
  templateUrl: "./creation.page.html",
  styleUrls: ["./creation.page.css"],
})
export class CreationPage {
  selectedOption = "program"

  onRadioChange(event: MatRadioChange): void {
    this.selectedOption = event.value
  }
}
