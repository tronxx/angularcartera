import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgacumpolComponent } from './dlgacumpol.component';

describe('DlgacumpolComponent', () => {
  let component: DlgacumpolComponent;
  let fixture: ComponentFixture<DlgacumpolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlgacumpolComponent]
    });
    fixture = TestBed.createComponent(DlgacumpolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
