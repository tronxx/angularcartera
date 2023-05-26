import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoscliComponent } from './datoscli.component';

describe('DatoscliComponent', () => {
  let component: DatoscliComponent;
  let fixture: ComponentFixture<DatoscliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatoscliComponent]
    });
    fixture = TestBed.createComponent(DatoscliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
