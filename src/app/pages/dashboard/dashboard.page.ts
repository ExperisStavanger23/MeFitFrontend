/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from "@angular/core"
import { ChartConfiguration, ChartData } from "chart.js"
import { EMPTY, Observable, firstValueFrom } from "rxjs"
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
    datasets: [{ data: [7, 7], backgroundColor: ["#41C17C", "#DF6565"] }],
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
  constructor(private apiUserService: UserApiService) {}

  async ngOnInit(): Promise<void> {
    await this.apiUserService.setUser()
    this.user = this.apiUserService.user$

    const user = await firstValueFrom(this.user)
    const [start, end] = getStartAndEndOfWeek()
    const doneWorkoutDates: Date[] = new Array<Date>(0)
    let doneThisWeek = 0
    for (const uw of user.userWorkouts!) {
      if (uw.doneDate !== null) {
        doneWorkoutDates.push(new Date(uw.doneDate))
        if (new Date(uw.doneDate) > start && new Date(uw.doneDate) < end) {
          doneThisWeek++
        }
      }
    }

    // Update doughnutChart data
    this.doughnutChartData = {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [doneThisWeek, user.workoutGoal! - doneThisWeek],
          backgroundColor: ["#41C17C", "#DF6565"],
        },
      ],
    }
  }
}

function getStartAndEndOfWeek() {
  // Get current date
  const today = new Date()

  // Get the difference
  const diff = today.getDate() - today.getDay()

  // Get the current week's start date
  const startDate = new Date(today.setDate(diff))
  // Get the current week's end date
  const endDate = new Date(today.setDate(diff + 6))

  return [startDate, endDate]
}
