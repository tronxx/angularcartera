import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportescliComponent } from './reportescli.component';

describe('ReportescliComponent', () => {
  let component: ReportescliComponent;
  let fixture: ComponentFixture<ReportescliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportescliComponent]
    });
    fixture = TestBed.createComponent(ReportescliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
