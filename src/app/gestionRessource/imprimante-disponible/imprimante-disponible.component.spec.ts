import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimanteDisponibleComponent } from './imprimante-disponible.component';

describe('ImprimanteDisponibleComponent', () => {
  let component: ImprimanteDisponibleComponent;
  let fixture: ComponentFixture<ImprimanteDisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimanteDisponibleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimanteDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
