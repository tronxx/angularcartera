import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesreqcajaComponent } from './detallesreqcaja.component';

describe('DetallesreqcajaComponent', () => {
  let component: DetallesreqcajaComponent;
  let fixture: ComponentFixture<DetallesreqcajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesreqcajaComponent]
    });
    fixture = TestBed.createComponent(DetallesreqcajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
