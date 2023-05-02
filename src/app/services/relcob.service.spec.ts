import { TestBed } from '@angular/core/testing';

import { RelcobService } from './relcob.service';

describe('RelcobService', () => {
  let service: RelcobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelcobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
