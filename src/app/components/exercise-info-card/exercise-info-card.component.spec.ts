import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseInfoCardComponent } from './exercise-info-card.component';

describe('ExerciseInfoCardComponent', () => {
  let component: ExerciseInfoCardComponent;
  let fixture: ComponentFixture<ExerciseInfoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseInfoCardComponent]
    });
    fixture = TestBed.createComponent(ExerciseInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
