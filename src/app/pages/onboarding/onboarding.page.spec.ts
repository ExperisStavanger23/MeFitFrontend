import { ComponentFixture, TestBed } from "@angular/core/testing"

import { OnboardingPage } from "./onboarding.page"

describe("OnboardingPage", () => {
  let component: OnboardingPage
  let fixture: ComponentFixture<OnboardingPage>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardingPage],
    })
    fixture = TestBed.createComponent(OnboardingPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
