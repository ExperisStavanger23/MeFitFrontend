/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from "@angular/core"
import { ChartConfiguration, ChartData } from "chart.js"
import { EMPTY, Observable } from "rxjs"
import { UserApiService } from "src/app/services/user-api.service"
import { User } from "src/interfaces"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.css"],
})
export class DashboardPage implements OnInit {
  // Doughnut
  public doughnutChartData: ChartData<"doughnut"> = {
    labels: ["Completed", "Remaining"],
    datasets: [{ data: [3, 7], backgroundColor: ["#41C17C", "#DF6565"] }],
  }

  public barChartData: ChartData<"bar"> = {
    labels: ["01", "02", "03", "04", "05", "06", "07"],
    datasets: [
      {
        data: [2, 5, 3, 8, 4, 5, 1],
        label: "Month/week",
        backgroundColor: "#324B9B",
      },
    ],
  }

  public barOptions: ChartConfiguration["options"] = {
    responsive: true,
    maintainAspectRatio: false,
  }

  user: Observable<User> = EMPTY
  constructor(private apiUserService: UserApiService) {
    // this.apiUserService.setUser(apiUserService._user$.value.id!)
    this.user = apiUserService.user$
  }

  async ngOnInit(): Promise<void> {
    console.log("oninitn dashboard")
  }
}
