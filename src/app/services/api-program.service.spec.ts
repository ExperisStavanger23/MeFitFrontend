import { TestBed } from '@angular/core/testing';

import { ApiProgramService } from './api-program.service';

describe('ApiProgramService', () => {
  let service: ApiProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
