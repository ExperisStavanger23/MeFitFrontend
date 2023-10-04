import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsPage } from './programs.page';

describe('ProgramsPage', () => {
  let component: ProgramsPage;
  let fixture: ComponentFixture<ProgramsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramsPage]
    });
    fixture = TestBed.createComponent(ProgramsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
