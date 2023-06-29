import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SabanvtasComponent } from './sabanvtas.component';

describe('SabanvtasComponent', () => {
  let component: SabanvtasComponent;
  let fixture: ComponentFixture<SabanvtasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SabanvtasComponent]
    });
    fixture = TestBed.createComponent(SabanvtasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
