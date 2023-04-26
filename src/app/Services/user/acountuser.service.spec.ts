import { TestBed } from '@angular/core/testing';

import { AcountuserService } from './acountuser.service';

describe('AcountuserService', () => {
  let service: AcountuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcountuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
