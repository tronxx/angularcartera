import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgpidprofertaComponent } from './dlgpidproferta.component';

describe('DlgpidprofertaComponent', () => {
  let component: DlgpidprofertaComponent;
  let fixture: ComponentFixture<DlgpidprofertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgpidprofertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgpidprofertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
