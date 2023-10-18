import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatSnackBar } from "@angular/material/snack-bar"
import { ApiProgramService } from "src/app/services/api-program.service"
import { ApiWorkoutService } from "src/app/services/api-workout.service"
import { PostProgram, Workout } from "src/interfaces"

@Component({
  selector: "app-program-creation-form",
  templateUrl: "./program-creation-form.component.html",
  styleUrls: ["./program-creation-form.component.css"],
})
export class ProgramCreationFormComponent implements OnInit {
  form: FormGroup
  creating = false
  selectedWorkoutsIds: number[] = []

  //TODO: replace with data from database/api
  experienceLevels = ["Beginner", "Intermediate", "Advanced"]
  programCategories = ["Strength", "Cardio", "CrossFit"]

  workouts: Workout[] = []

  constructor(
    private fb: FormBuilder,
    private apiProgramService: ApiProgramService,
    private apiWorkoutService: ApiWorkoutService,
    public snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      name: ["", Validators.required],
      description: ["", [Validators.required]],
      experienceLevel: [null, [Validators.required]],
      imageUrl: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /(http(s?):\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg|webp|tif|tiff))/i
          ),
        ],
      ],
      workouts: [null, [Validators.required]],
      category: [null, [Validators.required]],
      duration: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.apiWorkoutService.getAllWorkouts().subscribe((workouts: Workout[]) => {
      this.workouts = workouts
    })
  }

  handleSubmit(event: SubmitEvent): void {
    this.creating = true
    event.preventDefault()

    const programToPost: PostProgram = {
      name: this.form.value.name,
      description: this.form.value.description,
      category: this.form.value.category,
      recommendedLevel: this.form.value.experienceLevel,
      image: this.form.value.imageUrl,
      duration: this.form.value.duration,
      workoutIds: this.form.value.workouts.map((workoutId: string) =>
        parseInt(workoutId, 10)
      ),
    }
    this.apiProgramService
      .postProgram(programToPost)
      .subscribe((response: boolean) => {
        if (response) {
          this.snackBar.open("Program created successfully", "Created", {
            duration: 3000,
            panelClass: "snackbar-success",
          })
          this.form.reset()
        } else {
          this.snackBar.open("Program creation failed", "Failed", {
            duration: 1000,
            panelClass: "snackbar-fail",
          })
        }
      })
    this.creating = false
  }
}
