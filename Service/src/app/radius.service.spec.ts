import { TestBed } from '@angular/core/testing';

import { RadiusService } from './services/radius.service';

describe('RadiusService', () => {
  let service: RadiusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadiusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
