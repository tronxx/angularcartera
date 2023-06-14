import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlganclisalComponent } from './dlganclisal.component';

describe('DlganclisalComponent', () => {
  let component: DlganclisalComponent;
  let fixture: ComponentFixture<DlganclisalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlganclisalComponent]
    });
    fixture = TestBed.createComponent(DlganclisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
