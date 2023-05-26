import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgrenfacComponent } from './dlgrenfac.component';

describe('DlgrenfacComponent', () => {
  let component: DlgrenfacComponent;
  let fixture: ComponentFixture<DlgrenfacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgrenfacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgrenfacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
