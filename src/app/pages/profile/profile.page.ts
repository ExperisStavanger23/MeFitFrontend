import { Component } from "@angular/core"
import { UserApiService } from "src/app/services/user-api.service"
import { User } from "src/interfaces"

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.css"],
})
export class ProfilePage {
  user: User = {
    id: 1,
    name: "somaname",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur fermentum maximus. Etiam vulputate eleifend gravida. Etiam velit lectus, laoreet et nisi et, commodo mattis tellus. Phasellus at risus sit amet magna tincidunt tincidunt in sit amet ante. Integer blandit est massa, vel pharetra est vestibulum sit amet. In eget dui nibh. Aenean posuere auctor ipsum at bibendum. Etiam vitae justo et metus fermentum egestas in ut dolor.",
    birthday: "2023-10-06T08:11:01.395Z",
    created: [],
    email: "Email@Email.com",
    experienceLvl: 1,
    gender: "Male",
    goals: [],
    height: 180,
    weight: 60,
    profilePicture: "https://i.imgur.com/ParxNuP.png",
    role: {
      id: 0,
      roleTitle: "User",
    },
    userExercises: [],
    userPrograms: [],
    userWorkouts: [],
  }

  constructor(private userService: UserApiService) {}
}
