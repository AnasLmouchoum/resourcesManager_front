import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaprtementComponent } from './deaprtement.component';

describe('DeaprtementComponent', () => {
  let component: DeaprtementComponent;
  let fixture: ComponentFixture<DeaprtementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeaprtementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeaprtementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
