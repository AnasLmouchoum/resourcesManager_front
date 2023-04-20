import { TestBed } from '@angular/core/testing';

import { ImprimanteService } from './imprimante.service';

describe('ImprimanteService', () => {
  let service: ImprimanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImprimanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
