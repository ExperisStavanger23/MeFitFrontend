import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDetailsCardComponent } from './workout-details-card.component';

describe('WorkoutDetailsCardComponent', () => {
  let component: WorkoutDetailsCardComponent;
  let fixture: ComponentFixture<WorkoutDetailsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutDetailsCardComponent]
    });
    fixture = TestBed.createComponent(WorkoutDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
