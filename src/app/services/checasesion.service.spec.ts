import { TestBed } from '@angular/core/testing';

import { ChecasesionService } from './checasesion.service';

describe('ChecasesionService', () => {
  let service: ChecasesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecasesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
