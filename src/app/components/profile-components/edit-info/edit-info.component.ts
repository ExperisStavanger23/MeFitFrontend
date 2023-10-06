import { Component, Inject, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { User } from "src/interfaces"
@Component({
  selector: "app-edit-info",
  templateUrl: "./edit-info.component.html",
  styleUrls: ["./edit-info.component.css"],
})
export class EditInfoComponent implements OnInit {
  user: User
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<EditInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder
  ) {
    this.user = data
    this.form = fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      bio: [null],
      height: [null, Validators.pattern("^([5-9][0-9]|[1-2][0-9]{2}|300)$")],
      weight: [null, Validators.pattern("^([2-9][0-9]|[1-9][0-9][0-9])$")],
    })
  }

  ngOnInit(): void {
    this.form.setValue({
      name: this.user.name,
      email: this.user.email,
      bio: this.user.bio,
      weight: this.user.weight,
      height: this.user.height,
    })
  }

  // TODO
  // Proper form handling both here and in html
  handleSubmit(): void {
    const test: User = {
      ...this.user,
      ...this.form.value,
    }
    this.dialogRef.close(test)
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
}
