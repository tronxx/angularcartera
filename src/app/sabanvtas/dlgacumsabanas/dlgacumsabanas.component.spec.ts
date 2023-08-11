import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgacumsabanasComponent } from './dlgacumsabanas.component';

describe('DlgacumsabanasComponent', () => {
  let component: DlgacumsabanasComponent;
  let fixture: ComponentFixture<DlgacumsabanasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlgacumsabanasComponent]
    });
    fixture = TestBed.createComponent(DlgacumsabanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
