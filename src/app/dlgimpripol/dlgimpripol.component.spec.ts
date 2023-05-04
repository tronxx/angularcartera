import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgimpripolComponent } from './dlgimpripol.component';

describe('DlgimpripolComponent', () => {
  let component: DlgimpripolComponent;
  let fixture: ComponentFixture<DlgimpripolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgimpripolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgimpripolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
