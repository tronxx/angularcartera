import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgDatosVndComponent } from './dlg-datos-vnd.component';

describe('DlgDatosVndComponent', () => {
  let component: DlgDatosVndComponent;
  let fixture: ComponentFixture<DlgDatosVndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgDatosVndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgDatosVndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
