import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutInfoCardComponent } from './workout-info-card.component';

describe('WorkoutInfoCardComponent', () => {
  let component: WorkoutInfoCardComponent;
  let fixture: ComponentFixture<WorkoutInfoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutInfoCardComponent]
    });
    fixture = TestBed.createComponent(WorkoutInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
