/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from "@angular/core"
import { ChartConfiguration, ChartData } from "chart.js"
import { EMPTY, Observable, firstValueFrom } from "rxjs"
import { dateFormatter } from "src/app/app.component"
import { UserApiService } from "src/app/services/user-api.service"
import { randomFitnessQuote } from "src/assets/quotes"
import { User, UserWorkout } from "src/interfaces"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.css"],
})
export class DashboardPage implements OnInit {
  doneThisWeek = 0
  doneEachWeek: number[] = new Array<number>(0)
  currentDate: Date = new Date()
  quote = randomFitnessQuote

  // Doughnut
  public doughnutChartData: ChartData<"doughnut"> = {
    labels: ["Completed", "Remaining"],
    datasets: [{ data: [7, 7], backgroundColor: ["#41C17C", "#DF6565"] }],
  }

  public barChartData: ChartData<"bar"> = {
    labels: ["01", "02", "03", "04"],
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

  /**
   * Gets the user and sets the doneThisWeek and doneEachWeek variables.Then updates the chars
   */
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
    this.doneEachWeek = []
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
      this.doneEachWeek.push(doneThatWeek)
    }

    this.updateDoughnutChart()
    this.updateBarChart()
  }

  async markDone(userWorkout: UserWorkout) {
    userWorkout.doneDate = dateFormatter(new Date())
    this.apiUserService.updateUserWorkout(userWorkout)

    this.doneThisWeek += 1
    this.updateDoughnutChart()

    this.doneEachWeek[4] += 1
    this.updateBarChart()
  }

  async updateBarChart() {
    this.barChartData = {
      labels: [
        "Four weeks ago",
        "Three weeks ago",
        "Two weeks ago",
        "Last week",
        "This week",
      ],
      datasets: [
        {
          data: this.doneEachWeek,
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
          max: Math.max(...this.doneEachWeek) + 1,
        },
      },
    }
  }

  async updateDoughnutChart() {
    const user = await firstValueFrom(this.user)
    this.doughnutChartData = {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [
            this.doneThisWeek,
            user.workoutGoal! - this.doneThisWeek <= 0
              ? 0
              : user.workoutGoal! - this.doneThisWeek,
          ],
          backgroundColor: ["#41C17C", "#DF6565"],
        },
      ],
    }
  }

  toDateFromString(date: string): Date {
    return new Date(date)
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
