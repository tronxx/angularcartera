import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgnvasabanaComponent } from './dlgnvasabana.component';

describe('DlgnvasabanaComponent', () => {
  let component: DlgnvasabanaComponent;
  let fixture: ComponentFixture<DlgnvasabanaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlgnvasabanaComponent]
    });
    fixture = TestBed.createComponent(DlgnvasabanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
