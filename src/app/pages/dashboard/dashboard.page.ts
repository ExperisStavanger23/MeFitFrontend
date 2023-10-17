/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from "@angular/core"
import { ChartConfiguration, ChartData } from "chart.js"
import { EMPTY, Observable, firstValueFrom } from "rxjs"
import { UserApiService } from "src/app/services/user-api.service"
import { User, UserWorkout } from "src/interfaces"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.css"],
})
export class DashboardPage implements OnInit {
  doneThisWeek = 0

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
        label: "Done Workouts",
        backgroundColor: "#324B9B",
      },
    ],
  }

  public barOptions: ChartConfiguration["options"] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  user: Observable<User> = EMPTY
  constructor(private apiUserService: UserApiService) {}

  async ngOnInit(): Promise<void> {
    await this.apiUserService.setUser()
    this.user = this.apiUserService.user$

    const user = await firstValueFrom(this.user)
    const [start, end] = getStartAndEndOfWeek()

    for (const uw of user.userWorkouts!) {
      if (uw.doneDate !== null) {
        if (new Date(uw.doneDate) > start && new Date(uw.doneDate) < end) {
          this.doneThisWeek++
        }
      }
    }

    const doneEachWeek: number[] = new Array<number>(0)
    for (let i = 30; i >= 0; i = i - 7) {
      const wStart = new Date()
      const wEnd = new Date()
      wStart.setDate(wStart.getDate() - i)
      wEnd.setDate(wEnd.getDate() - (i - 7))
      let doneThatWeek = 0

      for (const uw of user.userWorkouts!) {
        if (uw.doneDate !== null) {
          if (new Date(uw.doneDate) > wStart && new Date(uw.doneDate) < wEnd) {
            doneThatWeek++
          }
        }
      }
      doneEachWeek.push(doneThatWeek)
    }

    // Update doughnutChart data
    this.doughnutChartData = {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [this.doneThisWeek, user.workoutGoal! - this.doneThisWeek],
          backgroundColor: ["#41C17C", "#DF6565"],
        },
      ],
    }

    this.barChartData = {
      labels: ["01", "02", "03", "04", "05", "06", "07"],
      datasets: [
        {
          data: doneEachWeek,
          label: "Done Workouts",
          backgroundColor: "#324B9B",
        },
      ],
    }

    this.barOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
          },
          max: Math.max(...doneEachWeek) + 1,
        },
      },
    }
    console.log(this.doneThisWeek)
  }

  async markDone(userWorkout: UserWorkout) {
    console.log(this.doneThisWeek)
    userWorkout.doneDate = dateFormatter(new Date())
    console.log(userWorkout)
    this.apiUserService.updateUserWorkout(userWorkout)
    const user = await firstValueFrom(this.user)
    this.doneThisWeek += 1
    this.doughnutChartData = {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [this.doneThisWeek, user.workoutGoal! - this.doneThisWeek],
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

function dateFormatter(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}
