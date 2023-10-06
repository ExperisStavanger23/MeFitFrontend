import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCreationFormComponent } from './program-creation-form.component';

describe('ProgramCreationFormComponent', () => {
  let component: ProgramCreationFormComponent;
  let fixture: ComponentFixture<ProgramCreationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramCreationFormComponent]
    });
    fixture = TestBed.createComponent(ProgramCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
