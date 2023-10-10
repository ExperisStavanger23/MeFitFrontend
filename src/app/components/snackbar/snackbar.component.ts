import { Component, Input } from "@angular/core"

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
  styles: [
    `
      .snackbar {
        color: var(--primary-color);
      }
    `,
  ],
})
export class SnackbarComponent {
  @Input() description!: string
  @Input() color!: string

  get snackbarStyle() {
    return { color: this.color || "var(--primary-color)" }
  }
}
