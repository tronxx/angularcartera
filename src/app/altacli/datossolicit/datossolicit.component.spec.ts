import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatossolicitComponent } from './datossolicit.component';

describe('DatossolicitComponent', () => {
  let component: DatossolicitComponent;
  let fixture: ComponentFixture<DatossolicitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatossolicitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatossolicitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
