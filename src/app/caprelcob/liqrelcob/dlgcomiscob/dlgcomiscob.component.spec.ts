import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgcomiscobComponent } from './dlgcomiscob.component';

describe('DlgcomiscobComponent', () => {
  let component: DlgcomiscobComponent;
  let fixture: ComponentFixture<DlgcomiscobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlgcomiscobComponent]
    });
    fixture = TestBed.createComponent(DlgcomiscobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
