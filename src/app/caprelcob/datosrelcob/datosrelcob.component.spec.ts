import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosrelcobComponent } from './datosrelcob.component';

describe('DatosrelcobComponent', () => {
  let component: DatosrelcobComponent;
  let fixture: ComponentFixture<DatosrelcobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosrelcobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosrelcobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
