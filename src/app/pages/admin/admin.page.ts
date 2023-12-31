import { Component, OnInit, ViewChild } from "@angular/core"
import { UserApiService } from "src/app/services/user-api.service"
import { User } from "src/interfaces"
import { MatDialog } from "@angular/material/dialog"
import { DialogComponent } from "src/app/components/dialog/dialog.component"
import { MatTable } from "@angular/material/table"
import { KeycloakService } from "keycloak-angular"
import { getTokenClaims } from "src/helper-functions"
import { Router } from "@angular/router"

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
    public dialog: MatDialog,
    private keycloak: KeycloakService,
    private route: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.users = await this.apiUserService.getUsers()
    const claims = getTokenClaims(await this.keycloak.getToken())
    try {
      const roles = claims.resource_access.MeFit.roles
      if (!roles.includes("Admin")) {
        console.log(roles)
        this.route.navigate(["/not-found"])
      }
    } catch (error) {
      this.route.navigate(["/not-found"])
    }
  }

  @ViewChild(MatTable) table!: MatTable<User>

  async handleEdit(user: User): Promise<void> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { user },
    })

    dialogRef.afterClosed().subscribe(async result => {
      await this.apiUserService.updateUser({
        ...result,
        role: { id: 0, roleTitle: "string" },
      })

      // Update the table
      const index = this.users.findIndex(u => u.id === result.id)
      this.users[index] = result

      this.table.renderRows()
    })
  }

  handleDelete(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id)
    this.users.splice(index, 1)

    if (user.id === undefined) return
    this.apiUserService.deleteUser(user.id)

    this.table.renderRows()
  }
}
