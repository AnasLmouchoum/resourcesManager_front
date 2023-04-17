import { TestBed } from '@angular/core/testing';

import { GestionAppelOffreService } from './gestion-appel-offre.service';

describe('GestionAppelOffreService', () => {
  let service: GestionAppelOffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionAppelOffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
