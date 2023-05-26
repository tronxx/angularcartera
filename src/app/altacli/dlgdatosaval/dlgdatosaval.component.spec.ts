import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgdatosavalComponent } from './dlgdatosaval.component';

describe('DlgdatosavalComponent', () => {
  let component: DlgdatosavalComponent;
  let fixture: ComponentFixture<DlgdatosavalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgdatosavalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgdatosavalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
