import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgreltraspComponent } from './dlgreltrasp.component';

describe('DlgreltraspComponent', () => {
  let component: DlgreltraspComponent;
  let fixture: ComponentFixture<DlgreltraspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgreltraspComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgreltraspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
