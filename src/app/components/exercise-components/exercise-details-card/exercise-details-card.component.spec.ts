import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDetailsCardComponent } from './exercise-details-card.component';

describe('ExerciseDetailsCardComponent', () => {
  let component: ExerciseDetailsCardComponent;
  let fixture: ComponentFixture<ExerciseDetailsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseDetailsCardComponent]
    });
    fixture = TestBed.createComponent(ExerciseDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
