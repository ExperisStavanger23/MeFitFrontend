import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseCreationFormComponent } from './exercise-creation-form.component';

describe('ExerciseCreationFormComponent', () => {
  let component: ExerciseCreationFormComponent;
  let fixture: ComponentFixture<ExerciseCreationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseCreationFormComponent]
    });
    fixture = TestBed.createComponent(ExerciseCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
