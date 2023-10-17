import { TestBed } from "@angular/core/testing"

import { ApiExercisesService } from "./api-exercises.service"

describe("ApiExercisesService", () => {
  let service: ApiExercisesService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ApiExercisesService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })
})
