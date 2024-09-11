import { TestBed } from '@angular/core/testing';

import { ChangeHarborService } from './change-harbor.service';

describe('ChangeHarborService', () => {
  let service: ChangeHarborService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeHarborService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
