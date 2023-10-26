import { Component, OnInit } from "@angular/core"
import { UserApiService } from "src/app/services/user-api.service"
import { User } from "src/interfaces"
import { MatDialog } from "@angular/material/dialog"
import { DialogComponent } from "src/app/components/dialog/dialog.component"

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.css"],
})
export class AdminPage implements OnInit {
  users: User[] = []
  displayedColumns: string[] = ["id", "name", "email", "edit", "delete"]
  constructor(
    private apiUserService: UserApiService,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.users = await this.apiUserService.getUsers()
    console.log(this.users)
  }

  async handleEdit(user: User): Promise<void> {
    console.log(user)
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { user },
    })

    dialogRef.afterClosed().subscribe(async result => {
      console.log("The dialog was closed")
      console.log(result)

      await this.apiUserService.updateUser({
        ...result,
        role: { id: 0, roleTitle: "string" },
      })

      // Update the table
      const index = this.users.findIndex(u => u.id === result.id)
      this.users[index] = result
    })
  }

  handleDelete(user: User): void {
    console.log(user)
  }
}
