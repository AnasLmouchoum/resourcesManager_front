import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinateurDisponibleComponent } from './ordinateur-disponible.component';

describe('OrdinateurDisponibleComponent', () => {
  let component: OrdinateurDisponibleComponent;
  let fixture: ComponentFixture<OrdinateurDisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdinateurDisponibleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdinateurDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
