import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgbuscaseriesComponent } from './dlgbuscaseries.component';

describe('DlgbuscaseriesComponent', () => {
  let component: DlgbuscaseriesComponent;
  let fixture: ComponentFixture<DlgbuscaseriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgbuscaseriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgbuscaseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
