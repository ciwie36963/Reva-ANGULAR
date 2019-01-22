import { TestBed } from '@angular/core/testing';

import { ErgoAdminDataService } from './ergo-admin-data.service';

describe('ErgoAdminDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErgoAdminDataService = TestBed.get(ErgoAdminDataService);
    expect(service).toBeTruthy();
  });
});
