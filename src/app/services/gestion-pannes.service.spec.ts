import { TestBed } from '@angular/core/testing';

import { GestionPannesService } from './gestion-pannes.service';

describe('GestionPannesService', () => {
  let service: GestionPannesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionPannesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
