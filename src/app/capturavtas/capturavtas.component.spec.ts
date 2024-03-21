import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturavtasComponent } from './capturavtas.component';

describe('CapturavtasComponent', () => {
  let component: CapturavtasComponent;
  let fixture: ComponentFixture<CapturavtasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapturavtasComponent]
    });
    fixture = TestBed.createComponent(CapturavtasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
