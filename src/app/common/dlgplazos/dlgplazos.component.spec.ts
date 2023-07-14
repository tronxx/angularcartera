import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgplazosComponent } from './dlgplazos.component';

describe('DlgplazosComponent', () => {
  let component: DlgplazosComponent;
  let fixture: ComponentFixture<DlgplazosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlgplazosComponent]
    });
    fixture = TestBed.createComponent(DlgplazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
