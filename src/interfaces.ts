export interface Claims {
  exp: number
  iat: number
  auth_time: number
  jti: string
  iss: string
  aud: string[]
  sub: string
  typ: string
  azp: string
  nonce: string
  session_state: string
  acr: string
  "allowed-origins": string[]
  realm_access: RealmAccess
  resource_access: ResourceAccess
  scope: string
  sid: string
  email_verified: boolean
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
}

export interface RealmAccess {
  roles: string[]
}

export interface ResourceAccess {
  "realm-management": RealmManagement
  account: Account
}

export interface RealmManagement {
  roles: string[]
}

export interface Account {
  roles: string[]
}

export interface PostUser {
  id: string
  name: string
  bio: string
  email: string
  profilePicture: string
  gender: string
  weight: number
  height: number
  birthday: Date
  roleId?: number
  experienceLvl: number
}

export interface User {
  id?: string
  name?: string
  bio?: string
  email?: string
  profilePicture?: string
  experienceLvl?: number
  workoutGoal?: number
  gender?: string
  weight?: number
  height?: number
  birthday?: string
  role?: Role
  created?: number[]
  userExercises?: number[]
  userWorkouts?: UserWorkout[]
  userPrograms?: UserProgram[]
}

export interface Role {
  id: number
  roleTitle: string
}

export interface UserProgram {
  id: number
  userId: number
  programId: number
  program: Program
  startDate: string
  endDate: string
}

export interface Program {
  id: number
  name: string
  description: string
  category: number
  recommendedLevel: number
  duration: number
  image: string
  workouts: Workout[]
}

export interface UserWorkout {
  id: number
  userId: string
  workoutId: number
  doneDate: string
  workout: Workout
}

export interface Workout {
  id: number
  name: string
  description: string
  category: string
  recommendedLevel: string
  duration: number
  image: string
  exercises: SetReps[]
}

export interface WorkoutExercises {
  workoutId: number
  exerciseId: number
  sets: number
  reps: number
  exercise: Exercise
}
export interface WorkoutGet {
  id: number
  name: string
  description: string
  category: string
  recommendedLevel: string
  duration: number
  image: string
  workoutExercises: WorkoutExercises[]
}

export interface PostWorkout {
  name: string
  description: string
  category: string
  recommendedLevel: string
  duration: number
  image: string
  workoutExercises: SetReps[]
}

export type Exercise = {
  id: number
  name: string
  description: string
  image: string
  video: string
  muscleGroups: MuscleGroup[]
}

export type MuscleGroup = {
  id: number
  name: string
}

export interface ExerciseSetRep {
  id: number
  name: string
  description: string
  image: string
  video: string
  sets: number
  reps: number
}

export interface SetReps {
  exerciseId: number
  workoutId: number
  sets: number
  reps: number
  name: string
}
export interface PostProgram {
  name: "string"
  description: "string"
  category: "string"
  recommendedLevel: "string"
  image: "string"
  duration: number
  workoutIds: number[]
}

export interface ProgramWithDate {
  id: number
  startDate: string
  endDate: string
}
