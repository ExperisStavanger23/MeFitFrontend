export type workout = {
  id: number
  name: string
  duration: number
  description: string
  imageUrl: string
  exercises: exercise[]
}
export type exercise = {
  id: number
  name: string
  description: string
  imageUrl: string
  tags: string[]
}

export type exerciseSetRep = {
  id: number
  name: string
  sets: number
  reps: number
}
