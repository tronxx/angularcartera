import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgbuscliComponent } from './dlgbuscli.component';

describe('DlgbuscliComponent', () => {
  let component: DlgbuscliComponent;
  let fixture: ComponentFixture<DlgbuscliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgbuscliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgbuscliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
