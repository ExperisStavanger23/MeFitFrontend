export type workout = {
  id: number
  name: string
  duration: number
  description: string
  imageUrl: string
  exercises: Exercise[]
}
export type Exercise = {
  id: number
  name: string
  description: string
  image: string
  video: string
}

export type ExerciseSetRep = {
  id: number
  name: string
  sets: number
  reps: number
}
