import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgrepcliviComponent } from './dlgrepclivi.component';

describe('DlgrepcliviComponent', () => {
  let component: DlgrepcliviComponent;
  let fixture: ComponentFixture<DlgrepcliviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlgrepcliviComponent]
    });
    fixture = TestBed.createComponent(DlgrepcliviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
