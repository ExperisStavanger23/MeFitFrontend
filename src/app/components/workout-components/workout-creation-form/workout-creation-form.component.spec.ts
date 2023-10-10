import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutCreationFormComponent } from './workout-creation-form.component';

describe('WorkoutCreationFormComponent', () => {
  let component: WorkoutCreationFormComponent;
  let fixture: ComponentFixture<WorkoutCreationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutCreationFormComponent]
    });
    fixture = TestBed.createComponent(WorkoutCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
