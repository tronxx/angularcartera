import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgimpriletrasComponent } from './dlgimpriletras.component';

describe('DlgimpriletrasComponent', () => {
  let component: DlgimpriletrasComponent;
  let fixture: ComponentFixture<DlgimpriletrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgimpriletrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgimpriletrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
