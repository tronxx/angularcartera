import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgdatosvendedorComponent } from './dlgdatosvendedor.component';

describe('DlgdatosvendedorComponent', () => {
  let component: DlgdatosvendedorComponent;
  let fixture: ComponentFixture<DlgdatosvendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgdatosvendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgdatosvendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
