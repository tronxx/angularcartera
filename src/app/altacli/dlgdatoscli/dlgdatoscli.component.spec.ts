import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgdatoscliComponent } from './dlgdatoscli.component';

describe('DlgdatoscliComponent', () => {
  let component: DlgdatoscliComponent;
  let fixture: ComponentFixture<DlgdatoscliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgdatoscliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgdatoscliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
