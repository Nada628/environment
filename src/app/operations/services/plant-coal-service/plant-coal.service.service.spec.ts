import { TestBed } from '@angular/core/testing';

import { PlantCoalServiceService } from './plant-coal.service.service';

describe('PlantCoalServiceService', () => {
  let service: PlantCoalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantCoalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
