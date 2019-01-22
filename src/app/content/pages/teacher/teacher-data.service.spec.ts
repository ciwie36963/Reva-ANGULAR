import { TestBed } from '@angular/core/testing';

import { TeacherDataService } from './teacher-data.service';

describe('TeacherDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherDataService = TestBed.get(TeacherDataService);
    expect(service).toBeTruthy();
  });
});
