import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqcajasComponent } from './reqcajas.component';

describe('ReqcajasComponent', () => {
  let component: ReqcajasComponent;
  let fixture: ComponentFixture<ReqcajasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReqcajasComponent]
    });
    fixture = TestBed.createComponent(ReqcajasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
