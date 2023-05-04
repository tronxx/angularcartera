import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportecomisComponent } from './reportecomis.component';

describe('ReportecomisComponent', () => {
  let component: ReportecomisComponent;
  let fixture: ComponentFixture<ReportecomisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportecomisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportecomisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
