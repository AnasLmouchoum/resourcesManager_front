import { TestBed } from '@angular/core/testing';

import { GestionDepartementsService } from './gestion-departements.service';

describe('GestionDepartementsService', () => {
  let service: GestionDepartementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionDepartementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
