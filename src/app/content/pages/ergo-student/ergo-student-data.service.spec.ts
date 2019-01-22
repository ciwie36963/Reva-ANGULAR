import { TestBed } from '@angular/core/testing';

import { ErgoStudentDataService } from './ergo-student-data.service';

describe('ErgoStudentDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErgoStudentDataService = TestBed.get(ErgoStudentDataService);
    expect(service).toBeTruthy();
  });
});
