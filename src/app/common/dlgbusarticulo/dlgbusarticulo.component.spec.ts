import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgbusarticuloComponent } from './dlgbusarticulo.component';

describe('DlgbusarticuloComponent', () => {
  let component: DlgbusarticuloComponent;
  let fixture: ComponentFixture<DlgbusarticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgbusarticuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgbusarticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
