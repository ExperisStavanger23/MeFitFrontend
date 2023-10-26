import { Component, Inject } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { User } from "src/interfaces"
@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})
export class DialogComponent {
  user: User
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private fb: FormBuilder
  ) {
    this.user = data.user

    this.form = fb.group({
      name: [
        this.user.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: [this.user.email, [Validators.required, Validators.email]],
      bio: [this.user.bio, Validators.maxLength(250)],
    })
  }

  handleSubmit(event: SubmitEvent): void {
    event.preventDefault()
    if (this.form.invalid) {
      return
    }
    const userToUpdate: User = {
      ...this.user,
      ...this.form.value,
    }
    this.dialogRef.close(userToUpdate)
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
}
