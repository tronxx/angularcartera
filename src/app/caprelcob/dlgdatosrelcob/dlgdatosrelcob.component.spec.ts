import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgdatosrelcobComponent } from './dlgdatosrelcob.component';

describe('DlgdatosrelcobComponent', () => {
  let component: DlgdatosrelcobComponent;
  let fixture: ComponentFixture<DlgdatosrelcobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgdatosrelcobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgdatosrelcobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
