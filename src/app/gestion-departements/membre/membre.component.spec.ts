import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreComponent } from './membre.component';

describe('MembreComponent', () => {
  let component: MembreComponent;
  let fixture: ComponentFixture<MembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
