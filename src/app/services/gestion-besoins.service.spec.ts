import { TestBed } from '@angular/core/testing';

import { GestionBesoinsService } from './gestion-besoins.service';

describe('GestionBesoinsService', () => {
  let service: GestionBesoinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionBesoinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
