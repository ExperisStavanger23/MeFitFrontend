import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatSnackBar } from "@angular/material/snack-bar"
import { ApiExercisesService } from "src/app/services/api-exercises.service"
import { Exercise, MuscleGroup } from "src/interfaces"

@Component({
  selector: "app-exercise-creation-form",
  templateUrl: "./exercise-creation-form.component.html",
  styleUrls: ["./exercise-creation-form.component.css"],
})
export class ExerciseCreationFormComponent implements OnInit {
  form: FormGroup
  creating = false
  valid = false
  muscleGroups: MuscleGroup[] = []

  constructor(
    private fb: FormBuilder,
    private apiExercisesService: ApiExercisesService,
    public snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      name: ["", Validators.required],
      description: ["", [Validators.required]],
      imageUrl: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /(http(s?):\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg|webp|tif|tiff))/i
          ),
        ],
      ],
      videoUrl: [""],
      muscleGroup: [],
    })
  }
  ngOnInit(): void {
    this.apiExercisesService
      .getMuscleGroups()
      .subscribe((muscleGroups: MuscleGroup[]) => {
        this.muscleGroups = muscleGroups
      })
  }

  handleSubmit(event: SubmitEvent): void {
    this.creating = true
    event.preventDefault()
    const exercise: Exercise = {
      id: 0,
      name: this.form.value.name,
      description: this.form.value.description,
      image: this.form.value.imageUrl,
      video: this.embedYouTubeURL(this.form.value.videoUrl),
      muscleGroups: this.form.value.muscleGroup,
    }
    this.apiExercisesService
      .postExercise(exercise)
      .subscribe((response: boolean) => {
        if (response) {
          this.snackBar.open("Exercise created successfully", "Created", {
            duration: 3000,
            panelClass: "snackbar-success",
          })
          this.form.reset()
        } else {
          this.snackBar.open("Exercise creation failed", "Failed", {
            duration: 1000,
            panelClass: "snackbar-fail",
          })
        }
      })
    this.creating = false
  }

  private embedYouTubeURL(originalURL: string) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]+)/

    const match = originalURL.match(regex)

    if (match && match[1]) {
      const videoId = match[1]
      const embeddedURL = `https://www.youtube.com/embed/${videoId}`
      return embeddedURL
    } else {
      return ""
    }
  }
}
