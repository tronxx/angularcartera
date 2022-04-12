import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgdatosmovcliComponent } from './dlgdatosmovcli.component';

describe('DlgdatosmovcliComponent', () => {
  let component: DlgdatosmovcliComponent;
  let fixture: ComponentFixture<DlgdatosmovcliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgdatosmovcliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgdatosmovcliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
